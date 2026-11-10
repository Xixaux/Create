'use client';

import React from 'react';

/**
 * elseif_2_2_2_2_7.tsx
 * 
 * This executor handles the core "ElseIf" (else-if) conditional operator.
 * 
 * Applies to folder ID '2.2.2.2.7' — the dedicated "elseif" node in the logic hierarchy.
 * 
 * Behavior: Self-tags the node with __taggedAsElseIfLogic = true
 * 
 * This tag identifies the node as an intermediate conditional branch that combines
 * an alternative condition check with its own consequence block. It allows chaining
 * multiple conditions after an initial "if" and before a final "else".
 * 
 * Critical for expressing complex multi-branch decision logic in sequences.
 * 
 * Pure self-declaration — no neighbor inspection or side effects.
 */

export default function elseif_2_2_2_2_7() {
  // Executive only — no UI needed
  return null;
}

export const execute = (sequence: any[], log: (msg: any, style?: string) => void) => {
  const elseIfLogicIds = ['2.2.2.2.7'];

  for (let i = 0; i < sequence.length; i++) {
    const node = sequence[i];

    if (!elseIfLogicIds.includes(node?.parentFolderId)) continue;

    if (!node.attributes) node.attributes = {};

    if (node.attributes.__taggedAsElseIfLogic === undefined) {
      node.attributes.__taggedAsElseIfLogic = true;

      log(
        `ElseIf-logic operator recognized at position ${i} (${node.parentFolderId})`,
        'color:#607d8b;background:rgba(96,125,139,0.1);padding:2px 6px;border-radius:4px;font-weight:bold;'
      );
    }
  }
};