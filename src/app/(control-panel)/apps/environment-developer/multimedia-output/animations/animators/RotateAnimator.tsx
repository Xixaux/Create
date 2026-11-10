'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { AnimationConfig } from '../types';

const axisMap: Record<string, Vector3> = {
  x: new Vector3(1, 0, 0),
  y: new Vector3(0, 1, 0),
  z: new Vector3(0, 0, 1),
  horizontal: new Vector3(0, 1, 0),
  vertical: new Vector3(1, 0, 0),
};

interface RotateAnimatorProps {
  config: (AnimationConfig & { type: 'rotate' }) | null;
  meshRef: React.RefObject<any>;
}

export default function RotateAnimator({ config, meshRef }: RotateAnimatorProps) {
  const progress = useRef(0);
  const prevTurns = useRef<number | null>(null);
  const startRotation = useRef({ x: 0, y: 0, z: 0 });

  useFrame((_, delta) => {
    if (!meshRef.current || !config?.direction) return;

    const axis = axisMap[config.direction.toLowerCase()] || axisMap.y; // default vertical spin
    const speed = config.speed === 'fast' ? 3 : config.speed === 'slow' ? 0.5 : 1.5; // turns per second
    const turns = config.turns ?? 0; // 0 = infinite spin, >0 = finite turns

    const isNewConfig = prevTurns.current !== turns;

    if (isNewConfig) {
      progress.current = 0;
      prevTurns.current = turns;
      startRotation.current = {
        x: meshRef.current.rotation.x,
        y: meshRef.current.rotation.y,
        z: meshRef.current.rotation.z,
      };
    }

    // If turns = 0 → spin forever
    // Otherwise → stop after reaching target turns
    if (turns === 0 || progress.current < Math.abs(turns)) {
      const deltaTurns = delta * speed * Math.sign(turns || 1); // direction from sign if specified
      progress.current += Math.abs(deltaTurns);

      const angleDelta = deltaTurns * Math.PI * 2;

      meshRef.current.rotation.x = startRotation.current.x + axis.x * angleDelta;
      meshRef.current.rotation.y = startRotation.current.y + axis.y * angleDelta;
      meshRef.current.rotation.z = startRotation.current.z + axis.z * angleDelta;
    }
  });

  return null;
}