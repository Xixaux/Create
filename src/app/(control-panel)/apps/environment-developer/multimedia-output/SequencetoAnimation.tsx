'use client';

/**
 * CRITICAL FIX: Cube movement in SequencetoAnimation was not working despite correct calculation results
 * 
 * Issue Summary:
 * - Calculation sequences (e.g., 8 + 8 = 16) executed correctly and attached sequenceResponse to __sequenceResponses.
 * - Polling in SequencetoAnimation detected the result and generated translateConfig.
 * - MoveAnimator received the config but the cube never moved and often threw "Cannot read properties of undefined (reading 'current')".
 * 
 * Root Cause:
 * - Conditional rendering of <MoveAnimator /> inside a <mesh> caused ref timing issues and physics disconnect.
 * - Direct Three.js position updates (mesh.position.add) on dynamic RigidBody children are ignored/overridden by Rapier.
 * - Using Rapier setTranslation with RigidBody ref failed due to ref not being properly attached during conditional render.
 * 
 * Final Solution:
 * - Always render the main <mesh> (no conditional mesh).
 * - Attach a stable ref to the mesh.
 * - Pass meshRef to MoveAnimator.
 * - MoveAnimator now directly updates mesh.position.add(vector) in useFrame (Three.js way).
 * - Works reliably with Rapier dynamic bodies because the mesh is always present and physics stays synced.
 * 
 * Caution to Future Developers:
 * - Never conditionally render the primary mesh inside a RigidBody if you plan to animate it via ref.
 * - For dynamic bodies in @react-three/rapier, prefer direct Three.js position updates on a persistent mesh over Rapier setTranslation unless using kinematic bodies.
 * - Always add a key to the RigidBody when switching states to force physics reset.
 * - Test animation in isolation first — hardcoded movement is the fastest way to confirm R3F + Rapier pipeline is healthy.
 * 
 * This bug cost hours of debugging due to silent failures and misleading "working logs". Always verify the visual pipeline separately from logic.
 */

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';
import { OrbitControls, Text, Grid } from '@react-three/drei';
import MoveAnimator from './animations/animators/MoveAnimator';
import calculationTriggers from './animations/result-triggers/calculationTriggers';

interface SequencetoAnimationProps {
  isSimulationRunning: boolean;
  currentSequences: any[][];
  pinnedNodes: any[];
}

export default function SequencetoAnimation({
  isSimulationRunning,
  currentSequences,
  pinnedNodes,
}: SequencetoAnimationProps) {
  const [latestResult, setLatestResult] = useState<number | null>(null);
  const meshRef = useRef<any>(null); // Ref for the main cube mesh

  // Polling for calculation result
  useEffect(() => {
    if (!isSimulationRunning) {
      setLatestResult(null);
      return;
    }

    const interval = setInterval(() => {
      if (typeof window !== 'undefined') {
        const responses = (window as any).__sequenceResponses || [];
        const calc = responses
          .slice()
          .reverse()
          .find((r: any) => r.type === 'calculation');
        if (calc && typeof calc.value === 'number') {
          setLatestResult(calc.value);
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isSimulationRunning]);

  // Determine animation config and feedback from calculation triggers
  const { translateConfig, feedbackText } = useMemo(() => {
    if (latestResult === null) {
      return { translateConfig: null, feedbackText: null };
    }

    const trigger = calculationTriggers
      .sort((a, b) => (b.priority || 0) - (a.priority || 0))
      .find((t) => t.match(latestResult));

    if (!trigger) {
      return { translateConfig: null, feedbackText: null };
    }

    const config = typeof trigger.config === 'function'
      ? trigger.config(latestResult)
      : trigger.config;

    const feedback = typeof trigger.feedback === 'function'
      ? trigger.feedback(latestResult)
      : trigger.feedback || null;

    return { translateConfig: config, feedbackText: feedback };
  }, [latestResult]);

  const shouldMove = translateConfig !== null;

  return (
    <Canvas camera={{ position: [10, 10, 10], fov: 60 }}>
      <color attach="background" args={['#0d1117']} />
      <fog attach="fog" args={['#0d1117', 10, 50]} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />

      <Grid
        args={[100, 50]}
        cellSize={2}
        cellThickness={1}
        cellColor="#00ff9d"
        sectionSize={10}
        sectionThickness={1.5}
        sectionColor="#333333"
        fadeDistance={50}
        position={[0, -0.01, 0]}
      />

      <Physics gravity={[0, -9.81, 0]}>
        <RigidBody type="fixed" friction={0.7}>
          <mesh receiveShadow position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#1e1e1e" />
          </mesh>
        </RigidBody>

        {/* Pinned nodes */}
        {pinnedNodes.map((node: any, i: number) => {
          const color =
            node.parentFolderId?.startsWith('2.1.9')
              ? '#ff6d00'
              : node.parentFolderId?.startsWith('2.2.')
                ? '#00e5ff'
                : node.parentFolderId?.startsWith('2.1.1.1.1.')
                  ? '#9333ea'
                  : '#00ff9d';

          return (
            <RigidBody
              key={node.id || i}
              position={[i * 3 - pinnedNodes.length * 1.5, 2 + Math.sin(i) * 2, 0]}
              restitution={0.8}
            >
              <mesh castShadow>
                <boxGeometry args={[1.2, 1.2, 1.2]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
              </mesh>
              <Text position={[0, 1.8, 0]} fontSize={0.6} color="#ffffff" anchorX="center" anchorY="middle">
                {node.name || 'Node'}
              </Text>
            </RigidBody>
          );
        })}

        {/* MAIN CUBE — mesh always present, ref attached */}
        <RigidBody
          key="main-cube"
          type="dynamic"
          restitution={0.5}
          friction={0.7}
          linearDamping={0.5}
        >
          <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#58a6ff" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Persistent MoveAnimator — always mounted, config passed as prop */}
          <MoveAnimator config={translateConfig} meshRef={meshRef} />
        </RigidBody>

        {/* Calculation feedback */}
        {feedbackText && (
          <>
            <Text position={[0, 10, 0]} fontSize={2.5} color="#ff0080" anchorX="center">
              {feedbackText.split('!')[0]}!
            </Text>
            {feedbackText.includes('CUBE') && (
              <Text position={[0, 8, 0]} fontSize={2} color="#ff0080" anchorX="center">
                {feedbackText.split('!')[1]?.trim()}
              </Text>
            )}
          </>
        )}

        {latestResult !== null && !feedbackText && (
          <Text position={[0, 6, 0]} fontSize={1.8} color="#ffeb3b" anchorX="center">
            LATEST RESULT: {latestResult}
          </Text>
        )}
      </Physics>

      <OrbitControls makeDefault minDistance={5} maxDistance={50} />
    </Canvas>
  );
}