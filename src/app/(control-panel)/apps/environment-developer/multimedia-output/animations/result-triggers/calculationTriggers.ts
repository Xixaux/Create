'use client';

import { AnimationConfig } from '../types';

export type CalculationTrigger = {
  // Allow the config to be a static object OR a function that receives the value
  match: (value: number) => boolean;
  config: AnimationConfig & { type: 'translate' } | ((value: number) => AnimationConfig & { type: 'translate' });
  feedback?: string | ((value: number) => string);
  priority?: number;
};

export const calculationTriggers: CalculationTrigger[] = [
  {
    // Match any positive number (you can narrow this later)
    match: (value) => Number.isInteger(value) && value > 0,
    config: (value) => ({
      type: 'translate',
      direction: 'forward',
      distance: value,        // ← Dynamic distance!
      speed: Math.min(4 + value / 10, 8), // Optional: faster for bigger numbers
    }),
    feedback: (value) => `${value}! CUBE MOVING FORWARD ${value} UNITS`,
    priority: 100,
  },

  // Optional: Special case for zero
  {
    match: (value) => value === 0,
    config: {
      type: 'translate',
      direction: 'up',
      distance: 8,
      speed: 3,
    },
    feedback: 'ZERO RESULT → CUBE FLOATS UP',
    priority: 200, // Higher priority = overrides general rule
  },

  // Optional: Negative numbers → move backward
  {
    match: (value) => Number.isInteger(value) && value < 0,
    config: (value) => ({
      type: 'translate',
      direction: 'back',
      distance: Math.abs(value),
      speed: 4,
    }),
    feedback: (value) => `${value} (negative) → CUBE MOVING BACKWARD ${Math.abs(value)} UNITS`,
    priority: 150,
  },
];

export default calculationTriggers;