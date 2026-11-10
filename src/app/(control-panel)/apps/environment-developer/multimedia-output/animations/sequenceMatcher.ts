import { AnimationConfig } from './types';
import positionalRegistry from './registry/positionalRegistry';


/**
 * SEQUENCE MATCHER – Easy Explanation for the Team
 * 
 * Purpose of this file:
 * This is the "direct command interpreter" for physical actions in our universe.
 * 
 * What it does, step by step:
 * 
 * 1. Imports the big list of hardcoded movement commands from positionalRegistry.ts
 *    (that's the file with 380+ specific node sequences that mean things like
 *    "move left 3 units" or "move up fast").
 * 
 * 2. Puts all those commands into a master list called allTriggers
 *    (we can easily add more registries later for flip, mirror, rotate, etc.).
 * 
 * 3. Provides one main function: findMatchingAnimation(sequences)
 *    This function is called whenever we run a set of node sequences.
 * 
 *    Inside the function:
 *    • It receives the current input sequences (same format used in ExecutionConsole and SequenceSets).
 *    • It pulls out the node IDs from each sequence (tries parentFolderId first, falls back to id).
 *    • It checks every sequence to see if the beginning of it EXACTLY matches one of
 *      the hardcoded command patterns in the registry (we use "prefix match" so extra nodes
 *      at the end don't break the command).
 *    • As soon as it finds a match, it immediately returns the exact animation config
 *      (for example: { type: 'translate', direction: 'left', distance: 3 }).
 * 
 * Key point:
 * This system works completely independently of calculations and results.
 * It's pure "if the user builds this exact command sequence → do this exact movement".
 * No math needed, no waiting for a number result — it's direct, intentional control.
 * 
 * Why this matters:
 * We now have two ways to move the cube:
 *   • Emergent (natural law): do math/logic → get a result → that result pushes the cube
 *   • Direct (engineered command): build a specific node pattern → cube obeys immediately
 * 
 * This file is the bridge that makes the second way possible.
 */
 
 
// Force it to be treated as an array (safety guard)
const movementArray = Array.isArray(positionalRegistry) ? positionalRegistry : [];

const allTriggers = [
  ...movementArray,
  // Add other registries later when they exist
];

function arraysMatchPrefix(a: string[], b: string[]): boolean {
  if (a.length < b.length) return false;
  return b.every((val, i) => a[i] === val);
}

export function findMatchingAnimation(sequences: any[][]): AnimationConfig | null {
  for (const seq of sequences) {
    if (!Array.isArray(seq)) continue;

    const ids = seq
      .map(node => node?.parentFolderId || node?.folderId || node?.id || '')
      .filter(Boolean);

    if (ids.length === 0) continue;

    for (const trigger of allTriggers) {
      if (arraysMatchPrefix(ids, trigger.sequence)) {
        return trigger.config;
      }
    }
  }

  return null;
}