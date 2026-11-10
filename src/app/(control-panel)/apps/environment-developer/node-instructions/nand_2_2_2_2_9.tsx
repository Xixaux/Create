'use client';

import React from 'react';

/**
 * nand_2_2_2_2_9.tsx
 * 
 * This executor handles the core "Nand" (NOT AND) logical operator.
 * 
 * Applies to folder ID '2.2.2.2.9' — the dedicated "nand" node in the logic hierarchy.
 * 
 * Behavior: Self-tags the node with __taggedAsNandLogic = true
 * 
 * This tag identifies the node as a binary logical NAND operator — the negation
 * of AND. It evaluates to true unless both operands are true. Forms a complete
 * logical basis (along with others) and is useful in advanced conditional logic.
 * 
 * Pure self-declaration — no neighbor inspection or side effects.
 */

export default function nand_2_2_2_2_9() {
  // Executive only — no UI needed
  return null;
}

export const execute = (sequence: any[], log: (msg: any, style?: string) => void) => {
  const nandLogicIds = ['2.2.2.2.9'];

  for (let i = 0; i < sequence.length; i++) {
    const node = sequence[i];

    if (!nandLogicIds.includes(node?.parentFolderId)) continue;

    if (!node.attributes) node.attributes = {};

    if (node.attributes.__taggedAsNandLogic === undefined) {
      node.attributes.__taggedAsNandLogic = true;

      log(
        `Nand-logic operator recognized at position ${i} (${node.parentFolderId})`,
        'color:#3f51b5;background:rgba(63,81,181,0.1);padding:2px 6px;border-radius:4px;font-weight:bold;'
      );
    }
  }
};