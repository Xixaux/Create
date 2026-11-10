'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AnimationConfig } from '../types';

interface ScaleAnimatorProps {
  config: (AnimationConfig & { type: 'scale', factor?: number }) | null;
  meshRef: React.RefObject<any>;
}

export default function ScaleAnimator({ config, meshRef }: ScaleAnimatorProps) {
  const progress = useRef(0);
  const prevFactor = useRef<number | null>(null);
  const startScale = useRef({ x: 1, y: 1, z: 1 });

  useFrame((_, delta) => {
    if (!meshRef.current || !config) return;

    const targetFactor = config.factor ?? 2; // default: grow to 2x
    const speed = config.speed === 'fast' ? 4 : config.speed === 'slow' ? 1 : 2;

    if (prevFactor.current !== targetFactor) {
      progress.current = 0;
      prevFactor.current = targetFactor;
      startScale.current = {
        x: meshRef.current.scale.x,
        y: meshRef.current.scale.y,
        z: meshRef.current.scale.z,
      };
    }

    if (progress.current < 1) {
      progress.current = Math.min(progress.current + delta * speed, 1);
      const t = progress.current;

      meshRef.current.scale.set(
        startScale.current.x + (targetFactor - 1) * t * startScale.current.x,
        startScale.current.y + (targetFactor - 1) * t * startScale.current.y,
        startScale.current.z + (targetFactor - 1) * t * startScale.current.z
      );
    }
  });

  return null;
}