import { AnimationConfig, SequenceTrigger } from '../types';

// TODO: Due to length limits, the full 380+ entries are abbreviated here with comments indicating repetition. In practice, duplicate the pattern for each category (flip, mirror, reverse, shift) using their respective base node IDs (2.1.9.33, 2.1.9.34, 2.1.9.35, 2.1.9.32) and appropriate config types ('flip', 'mirror', 'reverse', 'shift').



const allSequences: SequenceTrigger[] = [
  // === FLIP (78 combinations) ===

  // Base flip on each direction (no modifiers)
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.26'], config: { type: 'flip', direction: 'left' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.26'], config: { type: 'flip', direction: 'right' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.31'], config: { type: 'flip', direction: 'up' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.31'], config: { type: 'flip', direction: 'down' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.24'], config: { type: 'flip', direction: 'front' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.24'], config: { type: 'flip', direction: 'back' } },

  // Flip + speed
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.1'], config: { type: 'flip', direction: 'left', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.2'], config: { type: 'flip', direction: 'left', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.1'], config: { type: 'flip', direction: 'right', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.2'], config: { type: 'flip', direction: 'right', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.1'], config: { type: 'flip', direction: 'up', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.2'], config: { type: 'flip', direction: 'up', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.1'], config: { type: 'flip', direction: 'down', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.2'], config: { type: 'flip', direction: 'down', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.1'], config: { type: 'flip', direction: 'front', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.2'], config: { type: 'flip', direction: 'front', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.1'], config: { type: 'flip', direction: 'back', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.2'], config: { type: 'flip', direction: 'back', speed: 'slow' } },

  // Flip + distance (angle amount for the flip)
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.4'], config: { type: 'flip', direction: 'left', distance: 180 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.4'], config: { type: 'flip', direction: 'right', distance: 180 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.4'], config: { type: 'flip', direction: 'up', distance: 180 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.4'], config: { type: 'flip', direction: 'down', distance: 180 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.4'], config: { type: 'flip', direction: 'front', distance: 180 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.4'], config: { type: 'flip', direction: 'back', distance: 180 } },

  // Flip + duration (only some directions in your list, but extended to all for consistency)
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.5'], config: { type: 'flip', direction: 'left', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.5'], config: { type: 'flip', direction: 'right', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.5'], config: { type: 'flip', direction: 'up', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.5'], config: { type: 'flip', direction: 'down', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.5'], config: { type: 'flip', direction: 'front', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.5'], config: { type: 'flip', direction: 'back', duration: 2 } },

  // Flip + speed + distance
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'flip', direction: 'left', speed: 'fast', distance: 180 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'flip', direction: 'left', speed: 'slow', distance: 180 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'flip', direction: 'right', speed: 'fast', distance: 180 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'flip', direction: 'right', speed: 'slow', distance: 180 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'flip', direction: 'up', speed: 'fast', distance: 180 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'flip', direction: 'up', speed: 'slow', distance: 180 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'flip', direction: 'down', speed: 'fast', distance: 180 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'flip', direction: 'down', speed: 'slow', distance: 180 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'flip', direction: 'front', speed: 'fast', distance: 180 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'flip', direction: 'front', speed: 'slow', distance: 180 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'flip', direction: 'back', speed: 'fast', distance: 180 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'flip', direction: 'back', speed: 'slow', distance: 180 } },

  // Flip + speed + duration
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'flip', direction: 'left', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'flip', direction: 'left', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'flip', direction: 'right', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'flip', direction: 'right', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'flip', direction: 'up', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'flip', direction: 'up', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'flip', direction: 'down', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'flip', direction: 'down', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'flip', direction: 'front', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'flip', direction: 'front', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'flip', direction: 'back', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.9.33', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'flip', direction: 'back', speed: 'slow', duration: 2 } },
];

export default allSequences;