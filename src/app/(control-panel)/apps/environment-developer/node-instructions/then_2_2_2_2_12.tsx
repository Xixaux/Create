'use client';

import React from 'react';

/**
 * then_2_2_2_2_12.tsx
 * 
 * This executor handles the core "Then" consequence operator.
 * 
 * Applies to folder ID '2.2.2.2.12' — the dedicated "then" node in the logic hierarchy.
 * 
 * Behavior: Self-tags the node with __taggedAsThenLogic = true
 * 
 * This tag identifies the node as the marker that separates the condition
 * from the consequence in conditional logic structures (e.g., if → condition → then → action).
 * Critical for proper parsing and execution of rule-based implications.
 * 
 * Pure self-declaration — no neighbor inspection or side effects.
 */

export default function then_2_2_2_2_12() {
  // Executive only — no UI needed
  return null;
}

export const execute = (sequence: any[], log: (msg: any, style?: string) => void) => {
  const thenLogicIds = ['2.2.2.2.12'];

  for (let i = 0; i < sequence.length; i++) {
    const node = sequence[i];

    if (!thenLogicIds.includes(node?.parentFolderId)) continue;

    if (!node.attributes) node.attributes = {};

    if (node.attributes.__taggedAsThenLogic === undefined) {
      node.attributes.__taggedAsThenLogic = true;

      log(
        `Then-logic operator recognized at position ${i} (${node.parentFolderId})`,
        'color:#ffeb3b;background:rgba(255,235,59,0.15);padding:2px 6px;border-radius:4px;font-weight:bold;color:#000;'
      );
    }
  }
};