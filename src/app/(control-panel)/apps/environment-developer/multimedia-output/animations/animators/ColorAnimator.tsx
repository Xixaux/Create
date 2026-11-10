'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color } from 'three';
import { AnimationConfig } from '../types';

interface ColorAnimatorProps {
  config: (AnimationConfig & { type: 'color', targetColor?: string }) | null;
  meshRef: React.RefObject<any>;
}

export default function ColorAnimator({ config, meshRef }: ColorAnimatorProps) {
  const progress = useRef(0);
  const prevTarget = useRef<string | null>(null);
  const startColor = useRef(new Color());
  const targetColor = useRef(new Color());

  useFrame((_, delta) => {
    if (!meshRef.current || !config?.targetColor) return;

    const targetHex = config.targetColor;
    const speed = config.speed === 'fast' ? 3 : config.speed === 'slow' ? 0.8 : 1.8;

    if (prevTarget.current !== targetHex) {
      progress.current = 0;
      prevTarget.current = targetHex;
      startColor.current.copy(meshRef.current.material.color);
      targetColor.current.set(targetHex);
    }

    if (progress.current < 1) {
      progress.current = Math.min(progress.current + delta * speed, 1);
      meshRef.current.material.color.lerpColors(startColor.current, targetColor.current, progress.current);
      // Optional: also animate emissive
      if (meshRef.current.material.emissive) {
        meshRef.current.material.emissive.lerpColors(startColor.current, targetColor.current, progress.current);
      }
    }
  });

  return null;
}