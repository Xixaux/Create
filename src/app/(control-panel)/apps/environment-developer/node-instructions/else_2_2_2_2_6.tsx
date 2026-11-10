'use client';

import React from 'react';

/**
 * else_2_2_2_2_6.tsx
 * 
 * This executor handles the core "Else" conditional block operator.
 * 
 * Applies to folder ID '2.2.2.2.6' — the dedicated "else" node in the logic hierarchy.
 * 
 * Behavior: Self-tags the node with __taggedAsElseLogic = true
 * 
 * This tag identifies the node as the alternative branch in an if-then-else structure.
 * It marks the beginning of the consequence sequence that executes when the
 * preceding "if" condition evaluates to false.
 * 
 * Essential for full conditional branching support in logic resolution and
 * rule-based decision making.
 * 
 * Pure self-declaration — no neighbor inspection or side effects.
 */

export default function else_2_2_2_2_6() {
  // Executive only — no UI needed
  return null;
}

export const execute = (sequence: any[], log: (msg: any, style?: string) => void) => {
  const elseLogicIds = ['2.2.2.2.6'];

  for (let i = 0; i < sequence.length; i++) {
    const node = sequence[i];

    if (!elseLogicIds.includes(node?.parentFolderId)) continue;

    if (!node.attributes) node.attributes = {};

    if (node.attributes.__taggedAsElseLogic === undefined) {
      node.attributes.__taggedAsElseLogic = true;

      log(
        `Else-logic operator recognized at position ${i} (${node.parentFolderId})`,
        'color:#795548;background:rgba(121,85,72,0.1);padding:2px 6px;border-radius:4px;font-weight:bold;'
      );
    }
  }
};