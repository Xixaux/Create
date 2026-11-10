'use client';

import React from 'react';

/**
 * xnor_2_2_2_2_11.tsx
 * 
 * This executor handles the core "Xnor" (exclusive nor) logical operator.
 * 
 * Applies to folder ID '2.2.2.2.11' — the dedicated "xnor" node in the logic hierarchy.
 * 
 * Behavior: Self-tags the node with __taggedAsXnorLogic = true
 * 
 * This tag identifies the node as a binary logical XNOR operator — equivalent
 * to "equivalence". It evaluates to true when both operands are the same
 * (both true or both false). Useful for equality checking in complex logic.
 * 
 * Pure self-declaration — no neighbor inspection or side effects.
 */

export default function xnor_2_2_2_2_11() {
  // Executive only — no UI needed
  return null;
}

export const execute = (sequence: any[], log: (msg: any, style?: string) => void) => {
  const xnorLogicIds = ['2.2.2.2.11'];

  for (let i = 0; i < sequence.length; i++) {
    const node = sequence[i];

    if (!xnorLogicIds.includes(node?.parentFolderId)) continue;

    if (!node.attributes) node.attributes = {};

    if (node.attributes.__taggedAsXnorLogic === undefined) {
      node.attributes.__taggedAsXnorLogic = true;

      log(
        `Xnor-logic operator recognized at position ${i} (${node.parentFolderId})`,
        'color:#0097a7;background:rgba(0,151,167,0.1);padding:2px 6px;border-radius:4px;font-weight:bold;'
      );
    }
  }
};