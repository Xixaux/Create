'use client';

import React from 'react';

/**
 * xor_2_2_2_2_4.tsx
 * 
 * This executor handles the core "Xor" (exclusive or) logical operator.
 * 
 * Applies to folder ID '2.2.2.2.4' — the dedicated "xor" node in the logic hierarchy.
 * 
 * Behavior: Self-tags the node with __taggedAsXorLogic = true
 * 
 * This tag identifies the node as a binary logical XOR operator, which evaluates
 * to true when exactly one (but not both) of the operands is true. Essential
 * for mutually exclusive conditions and advanced decision logic.
 * 
 * Pure self-declaration — no neighbor inspection or side effects.
 */

export default function xor_2_2_2_2_4() {
  // Executive only — no UI needed
  return null;
}

export const execute = (sequence: any[], log: (msg: any, style?: string) => void) => {
  const xorLogicIds = ['2.2.2.2.4'];

  for (let i = 0; i < sequence.length; i++) {
    const node = sequence[i];

    if (!xorLogicIds.includes(node?.parentFolderId)) continue;

    if (!node.attributes) node.attributes = {};

    if (node.attributes.__taggedAsXorLogic === undefined) {
      node.attributes.__taggedAsXorLogic = true;

      log(
        `Xor-logic operator recognized at position ${i} (${node.parentFolderId})`,
        'color:#ff5722;background:rgba(255,87,34,0.1);padding:2px 6px;border-radius:4px;font-weight:bold;'
      );
    }
  }
};