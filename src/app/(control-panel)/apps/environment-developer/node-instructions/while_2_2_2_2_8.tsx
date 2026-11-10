'use client';

import React from 'react';

/**
 * while_2_2_2_2_8.tsx
 * 
 * This executor handles the core "While" loop construct operator.
 * 
 * Applies to folder ID '2.2.2.2.8' — the dedicated "while" node in the logic hierarchy.
 * 
 * Behavior: Self-tags the node with __taggedAsWhileLogic = true
 * 
 * This tag identifies the node as the start of a while-loop structure, indicating
 * that a subsequent block of actions should be repeatedly executed as long as
 * the associated condition evaluates to true.
 * 
 * Essential for supporting iteration and repetitive behavior in logic sequences
 * and rule-based systems.
 * 
 * Pure self-declaration — no neighbor inspection or side effects.
 */

export default function while_2_2_2_2_8() {
  // Executive only — no UI needed
  return null;
}

export const execute = (sequence: any[], log: (msg: any, style?: string) => void) => {
  const whileLogicIds = ['2.2.2.2.8'];

  for (let i = 0; i < sequence.length; i++) {
    const node = sequence[i];

    if (!whileLogicIds.includes(node?.parentFolderId)) continue;

    if (!node.attributes) node.attributes = {};

    if (node.attributes.__taggedAsWhileLogic === undefined) {
      node.attributes.__taggedAsWhileLogic = true;

      log(
        `While-logic operator recognized at position ${i} (${node.parentFolderId})`,
        'color:#e91e63;background:rgba(233,30,99,0.1);padding:2px 6px;border-radius:4px;font-weight:bold;'
      );
    }
  }
};