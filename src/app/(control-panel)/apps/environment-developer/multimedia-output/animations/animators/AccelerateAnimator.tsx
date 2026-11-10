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

interface AccelerateAnimatorProps {
  config: (AnimationConfig & { type: 'accelerate', magnitude?: number }) | null;
  meshRef: React.RefObject<any>;
}

export default function AccelerateAnimator({ config, meshRef }: AccelerateAnimatorProps) {
  const velocity = useRef(new Vector3(0, 0, 0));
  const prevMagnitude = useRef<number | null>(null);

  useFrame((_, delta) => {
    if (!meshRef.current || !config?.direction) return;

    const dir = directionMap[config.direction.toLowerCase()] || directionMap.right;
    const accelMagnitude = config.magnitude ?? 5; // units/sec²
    const speed = config.speed === 'fast' ? 1.5 : config.speed === 'slow' ? 0.5 : 1;

    if (prevMagnitude.current !== accelMagnitude) {
      velocity.current.set(0, 0, 0);
      prevMagnitude.current = accelMagnitude;
    }

    const accel = dir.clone().multiplyScalar(accelMagnitude * speed);
    velocity.current.add(accel.clone().multiplyScalar(delta));
    meshRef.current.position.add(velocity.current.clone().multiplyScalar(delta));
  });

  return null;
}