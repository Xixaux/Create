'use client';

import React from 'react';

/**
 * and_2_2_2_2_2.tsx
 * 
 * This executor handles the core "And" logical conjunction operator.
 * 
 * Applies to folder ID '2.2.2.2.2' — the dedicated "and" node in the logic hierarchy.
 * 
 * Behavior: Self-tags the node with __taggedAsAndLogic = true
 * 
 * This tag identifies the node as a binary logical AND operator, used to combine
 * two or more boolean conditions where all must be true for the result to be true.
 * Enables higher-level logic resolution to detect and evaluate compound conditions
 * such as: condition1 → and → condition2
 * 
 * Pure self-declaration — no neighbor inspection or side effects.
 */

export default function and_2_2_2_2_2() {
  // Executive only — no UI needed
  return null;
}

export const execute = (sequence: any[], log: (msg: any, style?: string) => void) => {
  const andLogicIds = ['2.2.2.2.2'];

  for (let i = 0; i < sequence.length; i++) {
    const node = sequence[i];

    if (!andLogicIds.includes(node?.parentFolderId)) continue;

    if (!node.attributes) node.attributes = {};

    if (node.attributes.__taggedAsAndLogic === undefined) {
      node.attributes.__taggedAsAndLogic = true;

      log(
        `And-logic operator recognized at position ${i} (${node.parentFolderId})`,
        'color:#4caf50;background:rgba(76,175,80,0.1);padding:2px 6px;border-radius:4px;font-weight:bold;'
      );
    }
  }
};