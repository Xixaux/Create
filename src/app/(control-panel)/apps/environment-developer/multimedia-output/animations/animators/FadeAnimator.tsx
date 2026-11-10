'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AnimationConfig } from '../types';

interface FadeAnimatorProps {
  config: (AnimationConfig & { type: 'fade', targetOpacity?: number }) | null;
  meshRef: React.RefObject<any>;
}

export default function FadeAnimator({ config, meshRef }: FadeAnimatorProps) {
  const progress = useRef(0);
  const prevTarget = useRef<number | null>(null);
  const startOpacity = useRef(1);

  useFrame((_, delta) => {
    if (!meshRef.current || !config) return;

    const target = config.targetOpacity ?? 0; // default: fade out
    const speed = config.speed === 'fast' ? 3 : config.speed === 'slow' ? 0.8 : 1.5;

    if (prevTarget.current !== target) {
      progress.current = 0;
      prevTarget.current = target;
      // @ts-ignore – assuming material is meshStandardMaterial with transparency enabled
      startOpacity.current = meshRef.current.material.opacity ?? 1;
    }

    if (progress.current < 1) {
      progress.current = Math.min(progress.current + delta * speed, 1);
      const opacity = startOpacity.current + (target - startOpacity.current) * progress.current;
      meshRef.current.material.opacity = opacity;
      meshRef.current.material.transparent = true;
    }
  });

  return null;
}