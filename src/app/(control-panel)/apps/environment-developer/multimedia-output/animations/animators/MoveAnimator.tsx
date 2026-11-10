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
  backward: new Vector3(0, 0, 1), // if you add negative later
};

interface MoveAnimatorProps {
  config: (AnimationConfig & { type: 'translate' }) | null;
  meshRef: React.RefObject<any>;
}

export default function MoveAnimator({ config, meshRef }: MoveAnimatorProps) {
  const progress = useRef(0);
  const prevDistance = useRef<number | null>(null);

  useFrame((_, delta) => {
    if (!meshRef.current || !config?.direction) {
      return;
    }

    const speed = config.speed === 'fast' ? 4 : config.speed === 'slow' ? 1 : (config.speed || 2);
    const target = config.distance || 3;

    // Reset progress only when a NEW movement starts (new target distance)
    if (prevDistance.current !== target) {
      progress.current = 0;
      prevDistance.current = target;
    }

    if (progress.current < target) {
      const moveAmount = delta * speed;
      const move = directionMap[config.direction].clone().multiplyScalar(moveAmount);
      meshRef.current.position.add(move);
      progress.current += move.length();
    }
    // When config becomes null, do nothing — progress stays for next time
  });

  return null;
}