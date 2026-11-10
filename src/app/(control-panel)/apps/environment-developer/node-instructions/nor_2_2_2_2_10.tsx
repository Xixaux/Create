'use client';

import React from 'react';

/**
 * nor_2_2_2_2_10.tsx
 * 
 * This executor handles the core "Nor" (NOT OR) logical operator.
 * 
 * Applies to folder ID '2.2.2.2.10' — the dedicated "nor" node in the logic hierarchy.
 * 
 * Behavior: Self-tags the node with __taggedAsNorLogic = true
 * 
 * This tag identifies the node as a binary logical NOR operator — the negation
 * of OR. It evaluates to true only when both operands are false. Provides
 * a functionally complete logical operator for advanced reasoning.
 * 
 * Pure self-declaration — no neighbor inspection or side effects.
 */

export default function nor_2_2_2_2_10() {
  // Executive only — no UI needed
  return null;
}

export const execute = (sequence: any[], log: (msg: any, style?: string) => void) => {
  const norLogicIds = ['2.2.2.2.10'];

  for (let i = 0; i < sequence.length; i++) {
    const node = sequence[i];

    if (!norLogicIds.includes(node?.parentFolderId)) continue;

    if (!node.attributes) node.attributes = {};

    if (node.attributes.__taggedAsNorLogic === undefined) {
      node.attributes.__taggedAsNorLogic = true;

      log(
        `Nor-logic operator recognized at position ${i} (${node.parentFolderId})`,
        'color:#f44336;background:rgba(244,67,54,0.1);padding:2px 6px;border-radius:4px;font-weight:bold;'
      );
    }
  }
};