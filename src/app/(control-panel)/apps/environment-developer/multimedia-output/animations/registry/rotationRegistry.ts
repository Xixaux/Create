import { AnimationConfig, SequenceTrigger } from '../types';

// TODO: Due to length limits, the full 380+ entries are abbreviated here with comments indicating repetition. In practice, duplicate the pattern for each category (flip, mirror, reverse, shift) using their respective base node IDs (2.1.9.33, 2.1.9.34, 2.1.9.35, 2.1.9.32) and appropriate config types ('flip', 'mirror', 'reverse', 'shift').



const allSequences: SequenceTrigger[] = [
  // === ROTATE (41 combinations) ===

  // Base rotate (no specific axis or modifiers)
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7'], config: { type: 'rotate' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.4'], config: { type: 'rotate', distance: 90 } },       // angle amount treated as "distance"
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.5'], config: { type: 'rotate', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.2.1'], config: { type: 'rotate', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.2.2'], config: { type: 'rotate', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'rotate', speed: 'fast', distance: 90 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'rotate', speed: 'slow', distance: 90 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'rotate', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'rotate', speed: 'slow', duration: 2 } },

  // Rotate on specific axes
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.1.26'], config: { type: 'rotate', axis: 'left' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.2.26'], config: { type: 'rotate', axis: 'right' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.1.31'], config: { type: 'rotate', axis: 'up' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.2.31'], config: { type: 'rotate', axis: 'down' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.1.24'], config: { type: 'rotate', axis: 'front' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.2.24'], config: { type: 'rotate', axis: 'back' } },

  // Axis + speed
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.1'], config: { type: 'rotate', axis: 'left', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.2'], config: { type: 'rotate', axis: 'left', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.1'], config: { type: 'rotate', axis: 'right', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.2'], config: { type: 'rotate', axis: 'right', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.1'], config: { type: 'rotate', axis: 'up', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.2'], config: { type: 'rotate', axis: 'up', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.1'], config: { type: 'rotate', axis: 'down', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.2'], config: { type: 'rotate', axis: 'down', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.1'], config: { type: 'rotate', axis: 'front', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.2'], config: { type: 'rotate', axis: 'front', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.1'], config: { type: 'rotate', axis: 'back', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.2'], config: { type: 'rotate', axis: 'back', speed: 'slow' } },

  // Axis + distance (angle amount)
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.4'], config: { type: 'rotate', axis: 'left', distance: 90 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.4'], config: { type: 'rotate', axis: 'right', distance: 90 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.4'], config: { type: 'rotate', axis: 'up', distance: 90 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.4'], config: { type: 'rotate', axis: 'down', distance: 90 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.4'], config: { type: 'rotate', axis: 'front', distance: 90 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.4'], config: { type: 'rotate', axis: 'back', distance: 90 } },

  // Axis + duration (some axes only have base duration, but left has it explicitly)
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.5'], config: { type: 'rotate', axis: 'left', duration: 2 } },

  // Axis + speed + duration combinations
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'rotate', axis: 'left', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'rotate', axis: 'left', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'rotate', axis: 'right', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'rotate', axis: 'right', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'rotate', axis: 'up', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'rotate', axis: 'up', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'rotate', axis: 'down', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'rotate', axis: 'down', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'rotate', axis: 'front', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'rotate', axis: 'front', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'rotate', axis: 'back', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'rotate', axis: 'back', speed: 'slow', duration: 2 } },
];

export default allSequences;import { AnimationConfig, SequenceTrigger } from '../types';

const rotationSequences: SequenceTrigger[] = [
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7'], config: { type: 'rotate', direction: 'left', angle: 90 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.4'], config: { type: 'rotate', direction: 'left', angle: 180, distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.2.1'], config: { type: 'rotate', direction: 'left', speed: 'fast' } },
  // Axis-specific
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.1.26'], config: { type: 'rotate', direction: 'left', angle: 90 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.7', '2.1.5.1.3', '2.1.3.2.26'], config: { type: 'rotate', direction: 'right', angle: 90 } },
  // Add all others...
];

export default rotationSequences;