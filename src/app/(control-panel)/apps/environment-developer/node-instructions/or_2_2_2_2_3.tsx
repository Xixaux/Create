'use client';

import React from 'react';

/**
 * or_2_2_2_2_3.tsx
 * 
 * This executor handles the core "Or" logical disjunction operator.
 * 
 * Applies to folder ID '2.2.2.2.3' — the dedicated "or" node in the logic hierarchy.
 * 
 * Behavior: Self-tags the node with __taggedAsOrLogic = true
 * 
 * This tag identifies the node as a binary logical OR operator, used to combine
 * two or more boolean conditions where at least one must be true for the result
 * to be true. Critical for inclusive conditional branching and rule matching.
 * 
 * Pure self-declaration — no neighbor inspection or side effects.
 */

export default function or_2_2_2_2_3() {
  // Executive only — no UI needed
  return null;
}

export const execute = (sequence: any[], log: (msg: any, style?: string) => void) => {
  const orLogicIds = ['2.2.2.2.3'];

  for (let i = 0; i < sequence.length; i++) {
    const node = sequence[i];

    if (!orLogicIds.includes(node?.parentFolderId)) continue;

    if (!node.attributes) node.attributes = {};

    if (node.attributes.__taggedAsOrLogic === undefined) {
      node.attributes.__taggedAsOrLogic = true;

      log(
        `Or-logic operator recognized at position ${i} (${node.parentFolderId})`,
        'color:#ff9800;background:rgba(255,152,0,0.1);padding:2px 6px;border-radius:4px;font-weight:bold;'
      );
    }
  }
};