'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { AnimationConfig } from '../types';

interface OrbitAnimatorProps {
  config: (AnimationConfig & { type: 'orbit', radius?: number, height?: number }) | null;
  meshRef: React.RefObject<any>;
}

export default function OrbitAnimator({ config, meshRef }: OrbitAnimatorProps) {
  const angle = useRef(0);
  const prevRadius = useRef<number | null>(null);
  const center = useRef(new Vector3(0, 0, 0));
  const startPos = useRef(new Vector3());

  useFrame((_, delta) => {
    if (!meshRef.current || !config) return;

    const radius = config.radius ?? 5;
    const height = config.height ?? 0;
    const speed = config.speed === 'fast' ? 1.5 : config.speed === 'slow' ? 0.3 : 0.8; // rad/sec

    if (prevRadius.current !== radius || prevRadius.current === null) {
      angle.current = 0;
      prevRadius.current = radius;
      startPos.current.copy(meshRef.current.position);
      center.current.set(startPos.current.x, startPos.current.y + height, startPos.current.z);
    }

    angle.current += delta * speed;

    meshRef.current.position.x = center.current.x + Math.sin(angle.current) * radius;
    meshRef.current.position.z = center.current.z + Math.cos(angle.current) * radius;
    meshRef.current.position.y = center.current.y;

    // Optional: face direction of travel
    meshRef.current.lookAt(
      center.current.x + Math.sin(angle.current + delta * speed * 10) * radius,
      center.current.y,
      center.current.z + Math.cos(angle.current + delta * speed * 10) * radius
    );
  });

  return null;
}