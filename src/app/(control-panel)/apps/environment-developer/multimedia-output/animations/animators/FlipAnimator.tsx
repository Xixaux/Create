'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { AnimationConfig } from '../types';

const axisMap: Record<string, Vector3> = {
  x: new Vector3(1, 0, 0),
  y: new Vector3(0, 1, 0),
  z: new Vector3(0, 0, 1),
  horizontal: new Vector3(0, 1, 0), // synonym for y
  vertical: new Vector3(1, 0, 0),   // synonym for x
};

interface FlipAnimatorProps {
  config: (AnimationConfig & { type: 'flip' }) | null;
  meshRef: React.RefObject<any>;
}

export default function FlipAnimator({ config, meshRef }: FlipAnimatorProps) {
  const progress = useRef(0);
  const prevTurns = useRef<number | null>(null);
  const startRotation = useRef({ x: 0, y: 0, z: 0 });

  useFrame((_, delta) => {
    if (!meshRef.current || !config?.direction) return;

    const axis = axisMap[config.direction.toLowerCase()] || axisMap.y;
    const speed = config.speed === 'fast' ? 4 : config.speed === 'slow' ? 1 : 2; // turns per second
    const turns = config.turns ?? 1; // default one full flip

    // Reset when a new flip (different turns count) starts
    if (prevTurns.current !== turns) {
      progress.current = 0;
      prevTurns.current = turns;
      startRotation.current = {
        x: meshRef.current.rotation.x,
        y: meshRef.current.rotation.y,
        z: meshRef.current.rotation.z,
      };
    }

    // Continue flipping while under target
    if (progress.current < Math.abs(turns)) {
      const deltaTurns = delta * speed * Math.sign(turns);
      progress.current += Math.abs(deltaTurns);

      const angleDelta = deltaTurns * Math.PI * 2;

      meshRef.current.rotation.x = startRotation.current.x + axis.x * angleDelta;
      meshRef.current.rotation.y = startRotation.current.y + axis.y * angleDelta;
      meshRef.current.rotation.z = startRotation.current.z + axis.z * angleDelta;
    }
  });

  return null;
}