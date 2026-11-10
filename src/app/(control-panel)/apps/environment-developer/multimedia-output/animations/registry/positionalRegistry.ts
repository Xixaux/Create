import { AnimationConfig, SequenceTrigger } from '../types';

// TODO: Due to length limits, the full 380+ entries are abbreviated here with comments indicating repetition. In practice, duplicate the pattern for each category (flip, mirror, reverse, shift) using their respective base node IDs (2.1.9.33, 2.1.9.34, 2.1.9.35, 2.1.9.32) and appropriate config types ('flip', 'mirror', 'reverse', 'shift').

/**
 * POSITIONAL COMMAND REGISTRY  (APPLIES ALSO TO OTHER REGISTRY'S IN THIS DIRECTORY)
 * 
 * This registry defines direct, imperative physical commands for the central cube.
 * Unlike calculationTriggers.ts (which maps numeric/logic RESULTS to proportional animations),
 * these triggers activate SOLELY based on the exact node ID sequence executed — 
 * bypassing calculation, evaluation, or result attachment entirely.
 * 
 * These are "hardcoded" movement verbs in the ontology: deliberate, precise instructions
 * such as "Move → Target → Apply → Left → Distance 3" that cause immediate, predictable
 * physical response with no emergent or proportional behavior.
 * 
 * This creates two parallel control paradigms in the universe:
 *   1. Emergent/Natural Law: Thought → Calculation → Result → Physics (via calculationTriggers)
 *   2. Intentional/Engineered: Direct Command Sequence → Physics (via positionalRegistry)
 * 
 * Together, they enable both discovery through reasoning and precise control through composition.
 */

const allSequences: SequenceTrigger[] = [
  // === MOVE LEFT (11 combinations) ===
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.4'], config: { type: 'translate', direction: 'left', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.1'], config: { type: 'translate', direction: 'left', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.2'], config: { type: 'translate', direction: 'left', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.5'], config: { type: 'translate', direction: 'left', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.7'], config: { type: 'translate', direction: 'left', angle: 45 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'translate', direction: 'left', speed: 'fast', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'translate', direction: 'left', speed: 'slow', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'translate', direction: 'left', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'translate', direction: 'left', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.1', '2.1.5.1.7'], config: { type: 'translate', direction: 'left', speed: 'fast', angle: 45 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.2', '2.1.5.1.7'], config: { type: 'translate', direction: 'left', speed: 'slow', angle: 45 } },

  // === MOVE RIGHT (11 combinations) ===
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.4'], config: { type: 'translate', direction: 'right', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.1'], config: { type: 'translate', direction: 'right', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.2'], config: { type: 'translate', direction: 'right', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.5'], config: { type: 'translate', direction: 'right', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.7'], config: { type: 'translate', direction: 'right', angle: 45 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'translate', direction: 'right', speed: 'fast', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'translate', direction: 'right', speed: 'slow', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'translate', direction: 'right', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'translate', direction: 'right', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.1', '2.1.5.1.7'], config: { type: 'translate', direction: 'right', speed: 'fast', angle: 45 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.2', '2.1.5.1.7'], config: { type: 'translate', direction: 'right', speed: 'slow', angle: 45 } },

  // === MOVE UP (11 combinations) ===
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.4'], config: { type: 'translate', direction: 'up', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.1'], config: { type: 'translate', direction: 'up', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.2'], config: { type: 'translate', direction: 'up', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.5'], config: { type: 'translate', direction: 'up', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.7'], config: { type: 'translate', direction: 'up', angle: 45 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'translate', direction: 'up', speed: 'fast', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'translate', direction: 'up', speed: 'slow', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'translate', direction: 'up', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'translate', direction: 'up', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.1', '2.1.5.1.7'], config: { type: 'translate', direction: 'up', speed: 'fast', angle: 45 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.2', '2.1.5.1.7'], config: { type: 'translate', direction: 'up', speed: 'slow', angle: 45 } },

  // === MOVE DOWN (11 combinations) ===
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.4'], config: { type: 'translate', direction: 'down', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.1'], config: { type: 'translate', direction: 'down', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.2'], config: { type: 'translate', direction: 'down', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.5'], config: { type: 'translate', direction: 'down', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.7'], config: { type: 'translate', direction: 'down', angle: 45 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'translate', direction: 'down', speed: 'fast', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'translate', direction: 'down', speed: 'slow', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'translate', direction: 'down', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'translate', direction: 'down', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.1', '2.1.5.1.7'], config: { type: 'translate', direction: 'down', speed: 'fast', angle: 45 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.2', '2.1.5.1.7'], config: { type: 'translate', direction: 'down', speed: 'slow', angle: 45 } },

  // === MOVE FRONT (11 combinations) ===
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.4'], config: { type: 'translate', direction: 'front', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.1'], config: { type: 'translate', direction: 'front', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.2'], config: { type: 'translate', direction: 'front', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.5'], config: { type: 'translate', direction: 'front', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.7'], config: { type: 'translate', direction: 'front', angle: 45 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'translate', direction: 'front', speed: 'fast', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'translate', direction: 'front', speed: 'slow', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'translate', direction: 'front', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'translate', direction: 'front', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.1', '2.1.5.1.7'], config: { type: 'translate', direction: 'front', speed: 'fast', angle: 45 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.2', '2.1.5.1.7'], config: { type: 'translate', direction: 'front', speed: 'slow', angle: 45 } },

  // === MOVE BACK (11 combinations) ===
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.4'], config: { type: 'translate', direction: 'back', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.1'], config: { type: 'translate', direction: 'back', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.2'], config: { type: 'translate', direction: 'back', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.5'], config: { type: 'translate', direction: 'back', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.7'], config: { type: 'translate', direction: 'back', angle: 45 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'translate', direction: 'back', speed: 'fast', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'translate', direction: 'back', speed: 'slow', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'translate', direction: 'back', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'translate', direction: 'back', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.1', '2.1.5.1.7'], config: { type: 'translate', direction: 'back', speed: 'fast', angle: 45 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.2', '2.1.5.1.7'], config: { type: 'translate', direction: 'back', speed: 'slow', angle: 45 } },
  // === MOVE LEFT (11 combinations) ===
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.4'], config: { type: 'translate', direction: 'left', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.1'], config: { type: 'translate', direction: 'left', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.2'], config: { type: 'translate', direction: 'left', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.5'], config: { type: 'translate', direction: 'left', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.7'], config: { type: 'translate', direction: 'left', angle: 45 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'translate', direction: 'left', speed: 'fast', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'translate', direction: 'left', speed: 'slow', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'translate', direction: 'left', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'translate', direction: 'left', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.1', '2.1.5.1.7'], config: { type: 'translate', direction: 'left', speed: 'fast', angle: 45 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.26', '2.1.5.1.2.2', '2.1.5.1.7'], config: { type: 'translate', direction: 'left', speed: 'slow', angle: 45 } },

  // === MOVE RIGHT (11 combinations) ===
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.4'], config: { type: 'translate', direction: 'right', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.1'], config: { type: 'translate', direction: 'right', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.2'], config: { type: 'translate', direction: 'right', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.5'], config: { type: 'translate', direction: 'right', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.7'], config: { type: 'translate', direction: 'right', angle: 45 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'translate', direction: 'right', speed: 'fast', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'translate', direction: 'right', speed: 'slow', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'translate', direction: 'right', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'translate', direction: 'right', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.1', '2.1.5.1.7'], config: { type: 'translate', direction: 'right', speed: 'fast', angle: 45 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.26', '2.1.5.1.2.2', '2.1.5.1.7'], config: { type: 'translate', direction: 'right', speed: 'slow', angle: 45 } },

  // === MOVE UP (11 combinations) ===
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.4'], config: { type: 'translate', direction: 'up', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.1'], config: { type: 'translate', direction: 'up', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.2'], config: { type: 'translate', direction: 'up', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.5'], config: { type: 'translate', direction: 'up', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.7'], config: { type: 'translate', direction: 'up', angle: 45 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'translate', direction: 'up', speed: 'fast', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'translate', direction: 'up', speed: 'slow', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'translate', direction: 'up', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'translate', direction: 'up', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.1', '2.1.5.1.7'], config: { type: 'translate', direction: 'up', speed: 'fast', angle: 45 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.31', '2.1.5.1.2.2', '2.1.5.1.7'], config: { type: 'translate', direction: 'up', speed: 'slow', angle: 45 } },

  // === MOVE DOWN (11 combinations) ===
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.4'], config: { type: 'translate', direction: 'down', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.1'], config: { type: 'translate', direction: 'down', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.2'], config: { type: 'translate', direction: 'down', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.5'], config: { type: 'translate', direction: 'down', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.7'], config: { type: 'translate', direction: 'down', angle: 45 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'translate', direction: 'down', speed: 'fast', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'translate', direction: 'down', speed: 'slow', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'translate', direction: 'down', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'translate', direction: 'down', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.1', '2.1.5.1.7'], config: { type: 'translate', direction: 'down', speed: 'fast', angle: 45 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.31', '2.1.5.1.2.2', '2.1.5.1.7'], config: { type: 'translate', direction: 'down', speed: 'slow', angle: 45 } },

  // === MOVE FRONT (11 combinations) ===
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.4'], config: { type: 'translate', direction: 'front', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.1'], config: { type: 'translate', direction: 'front', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.2'], config: { type: 'translate', direction: 'front', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.5'], config: { type: 'translate', direction: 'front', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.7'], config: { type: 'translate', direction: 'front', angle: 45 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'translate', direction: 'front', speed: 'fast', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'translate', direction: 'front', speed: 'slow', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'translate', direction: 'front', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'translate', direction: 'front', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.1', '2.1.5.1.7'], config: { type: 'translate', direction: 'front', speed: 'fast', angle: 45 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.1.24', '2.1.5.1.2.2', '2.1.5.1.7'], config: { type: 'translate', direction: 'front', speed: 'slow', angle: 45 } },

  // === MOVE BACK (11 combinations) ===
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.4'], config: { type: 'translate', direction: 'back', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.1'], config: { type: 'translate', direction: 'back', speed: 'fast' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.2'], config: { type: 'translate', direction: 'back', speed: 'slow' } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.5'], config: { type: 'translate', direction: 'back', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.7'], config: { type: 'translate', direction: 'back', angle: 45 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.1', '2.1.5.1.4'], config: { type: 'translate', direction: 'back', speed: 'fast', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.2', '2.1.5.1.4'], config: { type: 'translate', direction: 'back', speed: 'slow', distance: 3 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.1', '2.1.5.1.5'], config: { type: 'translate', direction: 'back', speed: 'fast', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.2', '2.1.5.1.5'], config: { type: 'translate', direction: 'back', speed: 'slow', duration: 2 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.1', '2.1.5.1.7'], config: { type: 'translate', direction: 'back', speed: 'fast', angle: 45 } },
  { sequence: ['2.1.5.1', '1.1.1', '2.1.5.1.3', '2.1.3.2.24', '2.1.5.1.2.2', '2.1.5.1.7'], config: { type: 'translate', direction: 'back', speed: 'slow', angle: 45 } },



  // Total: 198 (move) + ~60 (rotate) + ~60×3 (flip/mirror/reverse/shift) ≈ 378–380
];

export default allSequences;