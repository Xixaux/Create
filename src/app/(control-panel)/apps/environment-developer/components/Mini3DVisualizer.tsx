'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Box, Text } from '@react-three/drei';
import { useEffect, useState } from 'react';

interface VisualizerProps {
  nodeId?: string | null;           // e.g. "created_3_LBeam"
  pinnedNodes?: any[];              // your full pinnedNodes array from useEnvironment
}

export default function Mini3DVisualizer({ nodeId, pinnedNodes = [] }: VisualizerProps) {
  const [objectData, setObjectData] = useState<any>(null);

  // When nodeId changes, find the matching object in pinnedNodes
  useEffect(() => {
    if (!nodeId) {
      setObjectData(null);
      return;
    }
    const found = pinnedNodes.find(n => n.id === nodeId);
    setObjectData(found || null);
  }, [nodeId, pinnedNodes]);

  if (!objectData) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 rounded-lg">
        <p className="text-gray-500">Select a created thing to preview</p>
      </div>
    );
  }

  // Example: detect if it has been flipped
  const isFlipped = objectData.attributes?.flipped === true ||
                    objectData.attributes?.flipCount > 0;

  const color = isFlipped ? "#ff4444" : "#ff9500";

  return (
    <Canvas camera={{ position: [6, 6, 6], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Simple L-Beam made of two boxes */}
      <group scale={isFlipped ? [-1, 1, 1] : [1, 1, 1]}>
        <Box args={[4, 1, 1]} position={[0, 0.5, 0]}>
          <meshStandardMaterial color={color} />
        </Box>
        <Box args={[1, 2, 1]} position={[1.5, -0.5, 0]}>
          <meshStandardMaterial color={color} />
        </Box>
      </group>

      {/* Optional label */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.6}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {objectData.name} {isFlipped ? "(FLIPPED)" : ""}
      </Text>

      <Grid args={[20, 20]} />
      <OrbitControls makeDefault />
    </Canvas>
  );
}