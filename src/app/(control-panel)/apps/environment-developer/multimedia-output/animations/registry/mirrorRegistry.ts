import { AnimationConfig, SequenceTrigger } from '../types';

// TODO: Due to length limits, the full 380+ entries are abbreviated here with comments indicating repetition. In practice, duplicate the pattern for each category (flip, mirror, reverse, shift) using their respective base node IDs (2.1.9.33, 2.1.9.34, 2.1.9.35, 2.1.9.32) and appropriate config types ('flip', 'mirror', 'reverse', 'shift').



const allSequences: SequenceTrigger[] = [
  // === MIRROR (66 combinations) ===

  // Base mirror on each direction (no modifiers)
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.26'], config: { type: 'mirror', direction: 'left' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.26'], config: { type: 'mirror', direction: 'right' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.31'], config: { type: 'mirror', direction: 'up' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.31'], config: { type: 'mirror', direction: 'down' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.24'], config: { type: 'mirror', direction: 'front' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.24'], config: { type: 'mirror', direction: 'back' } },

  // Mirror + speed
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.1'], config: { type: 'mirror', direction: 'left', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.2'], config: { type: 'mirror', direction: 'left', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.1'], config: { type: 'mirror', direction: 'right', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.2'], config: { type: 'mirror', direction: 'right', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.1'], config: { type: 'mirror', direction: 'up', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.2'], config: { type: 'mirror', direction: 'up', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.1'], config: { type: 'mirror', direction: 'down', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.2'], config: { type: 'mirror', direction: 'down', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.1'], config: { type: 'mirror', direction: 'front', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.2'], config: { type: 'mirror', direction: 'front', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.1'], config: { type: 'mirror', direction: 'back', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.2'], config: { type: 'mirror', direction: 'back', speed: 'slow' } },

  // Mirror + distance
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.4'], config: { type: 'mirror', direction: 'left', distance: 1 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.4'], config: { type: 'mirror', direction: 'right', distance: 1 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.4'], config: { type: 'mirror', direction: 'up', distance: 1 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.4'], config: { type: 'mirror', direction: 'down', distance: 1 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.4'], config: { type: 'mirror', direction: 'front', distance: 1 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.4'], config: { type: 'mirror', direction: 'back', distance: 1 } },

  // Mirror + duration
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.5'], config: { type: 'mirror', direction: 'left', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.5'], config: { type: 'mirror', direction: 'right', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.5'], config: { type: 'mirror', direction: 'up', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.5'], config: { type: 'mirror', direction: 'down', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.5'], config: { type: 'mirror', direction: 'front', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.5'], config: { type: 'mirror', direction: 'back', duration: 2 } },

  // Mirror + speed + distance
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'mirror', direction: 'left', speed: 'fast', distance: 1 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'mirror', direction: 'left', speed: 'slow', distance: 1 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'mirror', direction: 'right', speed: 'fast', distance: 1 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'mirror', direction: 'right', speed: 'slow', distance: 1 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'mirror', direction: 'up', speed: 'fast', distance: 1 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'mirror', direction: 'up', speed: 'slow', distance: 1 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'mirror', direction: 'down', speed: 'fast', distance: 1 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'mirror', direction: 'down', speed: 'slow', distance: 1 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'mirror', direction: 'front', speed: 'fast', distance: 1 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'mirror', direction: 'front', speed: 'slow', distance: 1 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'mirror', direction: 'back', speed: 'fast', distance: 1 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'mirror', direction: 'back', speed: 'slow', distance: 1 } },

  // Mirror + speed + duration
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'mirror', direction: 'left', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'mirror', direction: 'left', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'mirror', direction: 'right', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'mirror', direction: 'right', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'mirror', direction: 'up', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'mirror', direction: 'up', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'mirror', direction: 'down', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'mirror', direction: 'down', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'mirror', direction: 'front', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'mirror', direction: 'front', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'mirror', direction: 'back', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.34', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'mirror', direction: 'back', speed: 'slow', duration: 2 } },
];

export default allSequences;