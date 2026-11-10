import { Vector3 } from 'three';

export type Direction = 'left' | 'right' | 'up' | 'down' | 'front' | 'back';

export type Speed = 'fast' | 'slow' | null;

export type AnimationType = 'translate' | 'rotate' | 'flip' | 'mirror' | 'reverse' | 'shift';

export interface AnimationConfig {
  type: AnimationType;
  direction: Direction;
  speed?: Speed;        // fast = 2x, slow = 0.5x
  distance?: number;    // e.g., 3 units
  duration?: number;    // seconds
  angle?: number;       // degrees for rotate/flip
}

export interface SequenceTrigger {
  sequence: string[];     // exact ordered parentFolderIds
  config: AnimationConfig;
}