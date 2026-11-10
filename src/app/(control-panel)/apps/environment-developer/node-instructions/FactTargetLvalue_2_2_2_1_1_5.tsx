'use client';

import React from 'react';

/**
 * FactTargetLvalue_2_2_2_1_1_5.tsx
 * 
 * This executor identifies nodes that serve as a fact-level target L-value
 * — i.e., a writable variable or state that is being asserted or updated
 * as part of a fact in a knowledge base, rule premise, or forward-chaining inference.
 * 
 * Applies specifically to folder ID '2.2.2.1.1.5'.
 * 
 * Behavior: Self-tags the node with __taggedAsFactTargetLvalue = true
 * 
 * This distinguishes it from general assignment targets (TargetLvalue) because
 * in rule-based reasoning, a "fact target" implies the node is part of an
 * asserted truth or working-memory update, not just a procedural assignment.
 * 
 * Used later in logic resolution to enable proper fact assertion, retraction,
 * and pattern matching in rule engines.
 * 
 * Pure self-declaration only — no neighbor scanning or side effects.
 */

export default function FactTargetLvalue_2_2_2_1_1_5() {
  // Executive only — no UI
  return null;
}

export const execute = (sequence: any[], log: (msg: any, style?: string) => void) => {
  const factTargetLvalueIds = ['2.2.2.1.1.5'];

  for (let i = 0; i < sequence.length; i++) {
    const node = sequence[i];

    if (!factTargetLvalueIds.includes(node?.parentFolderId)) continue;

    if (!node.attributes) node.attributes = {};

    if (node.attributes.__taggedAsFactTargetLvalue === undefined) {
      node.attributes.__taggedAsFactTargetLvalue = true;

      log(
        `Fact Target L-value recognized at position ${i} (${node.parentFolderId})`,
        'color:#d81b60;background:rgba(216,27,96,0.1);padding:2px 6px;border-radius:4px;font-weight:bold;'
      );
    }
  }
};