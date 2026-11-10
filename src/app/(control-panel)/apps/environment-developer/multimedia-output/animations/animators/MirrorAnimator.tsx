'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AnimationConfig } from '../types';

const axisMap: Record<string, 'x' | 'y' | 'z'> = {
  x: 'x',
  y: 'y',
  z: 'z',
  horizontal: 'x',    // mirroring over X = vertical mirror (left/right flip)
  vertical: 'y',      // mirroring over Y = horizontal mirror (up/down flip)
  depth: 'z',         // mirroring over Z = front/back flip
};

interface MirrorAnimatorProps {
  config: (AnimationConfig & { type: 'mirror' }) | null;
  meshRef: React.RefObject<any>;
}

export default function MirrorAnimator({ config, meshRef }: MirrorAnimatorProps) {
  const progress = useRef(0);
  const prevAxis = useRef<string | null>(null);
  const targetAxis = useRef<'x' | 'y' | 'z'>('y');
  const startScale = useRef({ x: 1, y: 1, z: 1 });

  useFrame((_, delta) => {
    if (!meshRef.current || !config?.direction) return;

    const axisKey = config.direction.toLowerCase();
    const axis = axisMap[axisKey] || axisMap.y; // default to y-axis (up/down mirror)

    const speed = config.speed === 'fast' ? 8 : config.speed === 'slow' ? 2 : 4; // scale speed

    // Detect new mirror command (different axis)
    if (prevAxis.current !== axis) {
      progress.current = 0;
      prevAxis.current = axis;
      targetAxis.current = axis;
      startScale.current = {
        x: meshRef.current.scale.x,
        y: meshRef.current.scale.y,
        z: meshRef.current.scale.z,
      };
    }

    // Animate scale toward -1 on the target axis (full mirror flip)
    if (progress.current < 1) {
      progress.current = Math.min(progress.current + delta * speed, 1);

      const eased = progress.current < 0.5
        ? 1 - 2 * progress.current          // shrink to 0
        : 2 * (progress.current - 0.5);     // grow back to 1 on negative side

      const currentScale = { ...startScale.current };
      currentScale[axis] = startScale.current[axis] * (1 - eased * 2); // ends at -1 * original

      meshRef.current.scale.set(
        currentScale.x,
        currentScale.y,
        currentScale.z
      );
    }
  });

  return null;
}