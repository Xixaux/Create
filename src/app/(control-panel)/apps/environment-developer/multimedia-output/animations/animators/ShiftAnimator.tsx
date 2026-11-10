'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { AnimationConfig } from '../types';

const directionMap: Record<string, Vector3> = {
  left: new Vector3(-1, 0, 0),
  right: new Vector3(1, 0, 0),
  up: new Vector3(0, 1, 0),
  down: new Vector3(0, -1, 0),
  front: new Vector3(0, 0, -1),
  back: new Vector3(0, 0, 1),
  forward: new Vector3(0, 0, -1),
  backward: new Vector3(0, 0, 1),
};

interface ShiftAnimatorProps {
  config: (AnimationConfig & { type: 'shift' }) | null;
  meshRef: React.RefObject<any>;
}

export default function ShiftAnimator({ config, meshRef }: ShiftAnimatorProps) {
  const progress = useRef(0);
  const prevDistance = useRef<number | null>(null);
  const startPosition = useRef({ x: 0, y: 0, z: 0 });

  useFrame((_, delta) => {
    if (!meshRef.current || !config?.direction) return;

    const direction = directionMap[config.direction.toLowerCase()] || directionMap.right;
    const speed = config.speed === 'fast' ? 12 : config.speed === 'slow' ? 4 : 7; // quick snap
    const distance = config.distance ?? 1.5; // how far to shift out

    // Reset on new shift command (different distance triggers new animation)
    if (prevDistance.current !== distance) {
      progress.current = 0;
      prevDistance.current = distance;
      startPosition.current = {
        x: meshRef.current.position.x,
        y: meshRef.current.position.y,
        z: meshRef.current.position.z,
      };
    }

    // Total animation time covers out + back = 2x distance
    if (progress.current < distance * 2) {
      progress.current += delta * speed;

      let offset = 0;
      if (progress.current < distance) {
        // Phase 1: shift out
        offset = progress.current;
      } else {
        // Phase 2: snap back
        offset = distance * 2 - progress.current;
      }

      const move = direction.clone().multiplyScalar(offset);
      meshRef.current.position.set(
        startPosition.current.x + move.x,
        startPosition.current.y + move.y,
        startPosition.current.z + move.z
      );
    }
  });

  return null;
}