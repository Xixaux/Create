'use client';

import React from 'react';

/**
 * if_2_2_2_2_1.tsx
 * 
 * This executor handles the core "If" logic operator node — the primary
 * conditional branching construct in logic sequences.
 * 
 * Applies to folder ID '2.2.2.2.1' (the dedicated "If" node in the hierarchy).
 * 
 * Behavior: Self-tags the node with __taggedAsIfLogic = true
 * 
 * This tag distinctly identifies the start of a conditional block
 * (e.g., "if condition then consequence"). It is used by the logic resolver
 * to detect and evaluate full conditional patterns, trigger branching,
 * or initiate rule-based inference.
 * 
 * Unlike L-value/R-value tags, this marks the operator itself — not operands.
 * Enables precise detection of full logic statements like:
 *   If → [condition sequence] → Then → [consequence sequence]
 * 
 * Pure self-declaration — no neighbor inspection or side effects here.
 * (Higher-level pattern matching will use this tag later.)
 */

export default function if_2_2_2_2_1() {
  // Executive only — no UI needed
  return null;
}

export const execute = (sequence: any[], log: (msg: any, style?: string) => void) => {
  const ifLogicIds = ['2.2.2.2.1'];

  for (let i = 0; i < sequence.length; i++) {
    const node = sequence[i];

    if (!ifLogicIds.includes(node?.parentFolderId)) continue;

    if (!node.attributes) node.attributes = {};

    // Tag only once
    if (node.attributes.__taggedAsIfLogic === undefined) {
      node.attributes.__taggedAsIfLogic = true;

      log(
        `If-logic operator recognized at position ${i} (${node.parentFolderId})`,
        'color:#00bcd4;background:rgba(0,188,212,0.1);padding:2px 6px;border-radius:4px;font-weight:bold;'
      );
    }
  }

  // Self-contained — no external mutations
};