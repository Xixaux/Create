'use client';

import React from 'react';

/**
 * not_2_2_2_2_5.tsx
 * 
 * This executor handles the core "Not" logical negation operator.
 * 
 * Applies to folder ID '2.2.2.2.5' — the dedicated "not" node in the logic hierarchy.
 * 
 * Behavior: Self-tags the node with __taggedAsNotLogic = true
 * 
 * This tag identifies the node as a unary logical NOT operator, which inverts
 * the truth value of its single operand. Crucial for expressing negation in
 * conditions and building complex logic expressions.
 * 
 * Pure self-declaration — no neighbor inspection or side effects.
 */

export default function not_2_2_2_2_5() {
  // Executive only — no UI needed
  return null;
}

export const execute = (sequence: any[], log: (msg: any, style?: string) => void) => {
  const notLogicIds = ['2.2.2.2.5'];

  for (let i = 0; i < sequence.length; i++) {
    const node = sequence[i];

    if (!notLogicIds.includes(node?.parentFolderId)) continue;

    if (!node.attributes) node.attributes = {};

    if (node.attributes.__taggedAsNotLogic === undefined) {
      node.attributes.__taggedAsNotLogic = true;

      log(
        `Not-logic operator recognized at position ${i} (${node.parentFolderId})`,
        'color:#9c27b0;background:rgba(156,39,176,0.1);padding:2px 6px;border-radius:4px;font-weight:bold;'
      );
    }
  }
};