'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AnimationConfig } from '../types';

interface ReverseAnimatorProps {
  config: (AnimationConfig & { type: 'reverse' }) | null;
  meshRef: React.RefObject<any>;
}

export default function ReverseAnimator({ config, meshRef }: ReverseAnimatorProps) {
  const progress = useRef(0);
  const prevTurns = useRef<number | null>(null);
  const startY = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current || !config) return;

    // Reverse is almost always around the Y-axis (vertical spin)
    // But we allow direction override just in case
    const direction = config.direction?.toLowerCase() || 'y';
    const isY = direction === 'y' || direction === 'vertical' || direction === 'horizontal';

    const speed = config.speed === 'fast' ? 4 : config.speed === 'slow' ? 1 : 2; // turns per second
    const turns = config.turns ?? 0.5; // default half turn (180°) – perfect for "reverse"

    // Reset when a new reverse command (different turns) arrives
    if (prevTurns.current !== turns) {
      progress.current = 0;
      prevTurns.current = turns;
      startY.current = meshRef.current.rotation.y;
    }

    if (progress.current < Math.abs(turns)) {
      const deltaTurns = delta * speed * Math.sign(turns);
      progress.current += Math.abs(deltaTurns);

      const angleDelta = deltaTurns * Math.PI * 2;

      if (isY) {
        meshRef.current.rotation.y = startY.current + angleDelta;
      } else {
        // Fallback: rotate around X or Z if specified (rare for reverse)
        if (direction === 'x') meshRef.current.rotation.x = startY.current + angleDelta;
        if (direction === 'z') meshRef.current.rotation.z = startY.current + angleDelta;
      }
    }
  });

  return null;
}