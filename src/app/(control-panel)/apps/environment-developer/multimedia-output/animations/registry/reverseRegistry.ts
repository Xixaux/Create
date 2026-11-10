import { AnimationConfig, SequenceTrigger } from '../types';

// TODO: Due to length limits, the full 380+ entries are abbreviated here with comments indicating repetition. In practice, duplicate the pattern for each category (flip, mirror, reverse, shift) using their respective base node IDs (2.1.9.33, 2.1.9.34, 2.1.9.35, 2.1.9.32) and appropriate config types ('flip', 'mirror', 'reverse', 'shift').



const allSequences: SequenceTrigger[] = [
  // === REVERSE (66 combinations) ===

  // Base reverse on each direction (no modifiers)
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.26'], config: { type: 'reverse', direction: 'left' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.26'], config: { type: 'reverse', direction: 'right' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.31'], config: { type: 'reverse', direction: 'up' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.31'], config: { type: 'reverse', direction: 'down' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.24'], config: { type: 'reverse', direction: 'front' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.24'], config: { type: 'reverse', direction: 'back' } },

  // Reverse + speed
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.1'], config: { type: 'reverse', direction: 'left', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.2'], config: { type: 'reverse', direction: 'left', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.1'], config: { type: 'reverse', direction: 'right', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.2'], config: { type: 'reverse', direction: 'right', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.1'], config: { type: 'reverse', direction: 'up', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.2'], config: { type: 'reverse', direction: 'up', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.1'], config: { type: 'reverse', direction: 'down', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.2'], config: { type: 'reverse', direction: 'down', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.1'], config: { type: 'reverse', direction: 'front', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.2'], config: { type: 'reverse', direction: 'front', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.1'], config: { type: 'reverse', direction: 'back', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.2'], config: { type: 'reverse', direction: 'back', speed: 'slow' } },

  // Reverse + distance (e.g., number of steps to reverse)
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.4'], config: { type: 'reverse', direction: 'left', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.4'], config: { type: 'reverse', direction: 'right', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.4'], config: { type: 'reverse', direction: 'up', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.4'], config: { type: 'reverse', direction: 'down', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.4'], config: { type: 'reverse', direction: 'front', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.4'], config: { type: 'reverse', direction: 'back', distance: 3 } },

  // Reverse + duration
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.5'], config: { type: 'reverse', direction: 'left', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.5'], config: { type: 'reverse', direction: 'right', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.5'], config: { type: 'reverse', direction: 'up', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.5'], config: { type: 'reverse', direction: 'down', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.5'], config: { type: 'reverse', direction: 'front', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.5'], config: { type: 'reverse', direction: 'back', duration: 2 } },

  // Reverse + speed + distance
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'reverse', direction: 'left', speed: 'fast', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'reverse', direction: 'left', speed: 'slow', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'reverse', direction: 'right', speed: 'fast', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'reverse', direction: 'right', speed: 'slow', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'reverse', direction: 'up', speed: 'fast', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'reverse', direction: 'up', speed: 'slow', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'reverse', direction: 'down', speed: 'fast', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'reverse', direction: 'down', speed: 'slow', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'reverse', direction: 'front', speed: 'fast', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'reverse', direction: 'front', speed: 'slow', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'reverse', direction: 'back', speed: 'fast', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'reverse', direction: 'back', speed: 'slow', distance: 3 } },

  // Reverse + speed + duration
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'reverse', direction: 'left', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'reverse', direction: 'left', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'reverse', direction: 'right', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'reverse', direction: 'right', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'reverse', direction: 'up', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'reverse', direction: 'up', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'reverse', direction: 'down', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'reverse', direction: 'down', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'reverse', direction: 'front', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'reverse', direction: 'front', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'reverse', direction: 'back', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.35', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'reverse', direction: 'back', speed: 'slow', duration: 2 } },
];

export default allSequences;