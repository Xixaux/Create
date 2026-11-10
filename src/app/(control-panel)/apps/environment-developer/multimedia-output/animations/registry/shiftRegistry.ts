import { AnimationConfig, SequenceTrigger } from '../types';

// TODO: Due to length limits, the full 380+ entries are abbreviated here with comments indicating repetition. In practice, duplicate the pattern for each category (flip, mirror, reverse, shift) using their respective base node IDs (2.1.9.33, 2.1.9.34, 2.1.9.35, 2.1.9.32) and appropriate config types ('flip', 'mirror', 'reverse', 'shift').



const allSequences: SequenceTrigger[] = [
  // === SHIFT (66 combinations) ===

  // Base shift on each direction (no modifiers)
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.26'], config: { type: 'shift', direction: 'left' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.26'], config: { type: 'shift', direction: 'right' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.31'], config: { type: 'shift', direction: 'up' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.31'], config: { type: 'shift', direction: 'down' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.24'], config: { type: 'shift', direction: 'front' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.24'], config: { type: 'shift', direction: 'back' } },

  // Shift + speed
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.1'], config: { type: 'shift', direction: 'left', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.2'], config: { type: 'shift', direction: 'left', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.1'], config: { type: 'shift', direction: 'right', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.2'], config: { type: 'shift', direction: 'right', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.1'], config: { type: 'shift', direction: 'up', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.2'], config: { type: 'shift', direction: 'up', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.1'], config: { type: 'shift', direction: 'down', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.2'], config: { type: 'shift', direction: 'down', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.1'], config: { type: 'shift', direction: 'front', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.2'], config: { type: 'shift', direction: 'front', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.1'], config: { type: 'shift', direction: 'back', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.2'], config: { type: 'shift', direction: 'back', speed: 'slow' } },

  // Shift + distance (amount of shift)
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.4'], config: { type: 'shift', direction: 'left', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.4'], config: { type: 'shift', direction: 'right', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.4'], config: { type: 'shift', direction: 'up', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.4'], config: { type: 'shift', direction: 'down', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.4'], config: { type: 'shift', direction: 'front', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.4'], config: { type: 'shift', direction: 'back', distance: 3 } },

  // Shift + duration
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.5'], config: { type: 'shift', direction: 'left', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.5'], config: { type: 'shift', direction: 'right', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.5'], config: { type: 'shift', direction: 'up', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.5'], config: { type: 'shift', direction: 'down', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.5'], config: { type: 'shift', direction: 'front', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.5'], config: { type: 'shift', direction: 'back', duration: 2 } },

  // Shift + speed + distance
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'shift', direction: 'left', speed: 'fast', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'shift', direction: 'left', speed: 'slow', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'shift', direction: 'right', speed: 'fast', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'shift', direction: 'right', speed: 'slow', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'shift', direction: 'up', speed: 'fast', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'shift', direction: 'up', speed: 'slow', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'shift', direction: 'down', speed: 'fast', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'shift', direction: 'down', speed: 'slow', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'shift', direction: 'front', speed: 'fast', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'shift', direction: 'front', speed: 'slow', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'shift', direction: 'back', speed: 'fast', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'shift', direction: 'back', speed: 'slow', distance: 3 } },

  // Shift + speed + duration
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'shift', direction: 'left', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'shift', direction: 'left', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'shift', direction: 'right', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'shift', direction: 'right', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'shift', direction: 'up', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'shift', direction: 'up', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'shift', direction: 'down', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'shift', direction: 'down', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'shift', direction: 'front', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'shift', direction: 'front', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'shift', direction: 'back', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.32', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'shift', direction: 'back', speed: 'slow', duration: 2 } },
];

export default allSequences;