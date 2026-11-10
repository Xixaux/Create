'use client';

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Box as ThreeBox, Text } from '@react-three/drei';
import { Button, Box } from '@mui/material';
import { PinnedNode } from '../CreateNewNode';

export default function SpatialEnvironment({ pinnedNodes = [] }: { pinnedNodes: PinnedNode[] }) {
  const sceneRef = useRef<any>(null);

  const createdThings = pinnedNodes.filter(
    (n) => n.id.startsWith('created_') && n.parentFolderId.startsWith('1.1')
  );

  const moveObject = (deltaX: number) => {
    if (!sceneRef.current) return;

    const firstGroup = sceneRef.current.children.find((obj: any) => obj.type === 'Group');
    if (firstGroup) {
      firstGroup.position.x += deltaX;
      firstGroup.position.y = 5; // keeps it floating nicely
      console.log('Moved to:', firstGroup.position.x.toFixed(1));
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '420px' }}>
      <Canvas
        camera={{ position: [15, 12, 15], fov: 50 }}
        shadows
        gl={{ antialias: true }}
        onCreated={(state) => (sceneRef.current = state.scene)}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 15, 10]} intensity={1.4} castShadow />

        <Grid args={[40, 40]} cellSize={1} cellThickness={0.6} cellColor="#004430"
          sectionSize={5} sectionThickness={1.2} sectionColor="#00ff9d" fadeDistance={50} fadeStrength={1} />

        {createdThings.map((node, idx) => {
          const isFlipped = node.attributes?.flipped || node.attributes?.flipCount > 0;
          const color = isFlipped ? '#ff4444' : '#ffffff';
          const posX = (idx % 8) * 6 - 18;
          const posZ = Math.floor(idx / 8) * 6 - 9;

          return (
            <group key={node.id} position={[posX, 0, posZ]} scale={isFlipped ? [-1, 1, 1] : [1, 1, 1]}>
              <ThreeBox args={[5, 1, 1]} position={[0, 0.5, 0]}>
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={isFlipped ? 0.6 : 0.2} />
              </ThreeBox>
              <ThreeBox args={[1, 3, 1]} position={[2, 1, 0]}>
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={isFlipped ? 0.6 : 0.2} />
              </ThreeBox>
              <Text position={[0, 4.5, 0]} fontSize={0.8} color="black" anchorX="center" anchorY="middle"
                outlineWidth={0.1} outlineColor="#ffffff">
                {node.name}{isFlipped ? ' (FLIPPED)' : ''}
              </Text>
            </group>
          );
        })}

        <OrbitControls makeDefault />
      </Canvas>

      {/* CONTROL PANEL — BACK AND FORTH FOREVER */}
      <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10, display: 'flex', gap: 1.5 }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => moveObject(-10)}
          sx={{
            bgcolor: '#4444ff',
            color: 'white',
            fontWeight: 700,
            minWidth: 100,
            '&:hover': { bgcolor: '#2222cc' },
          }}
        >
          ← Back
        </Button>

        <Button
          variant="contained"
          size="small"
          onClick={() => moveObject(+10)}
          sx={{
            bgcolor: '#ff4444',
            color: 'white',
            fontWeight: 700,
            minWidth: 100,
            '&:hover': { bgcolor: '#cc0000' },
          }}
        >
          Forward →
        </Button>
      </Box>
    </Box>
  );
}