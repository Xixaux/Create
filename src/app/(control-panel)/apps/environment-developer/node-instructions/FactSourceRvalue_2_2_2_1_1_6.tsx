'use client';

import React from 'react';

/**
 * FactSourceRvalue_2_2_2_1_1_6.tsx
 * 
 * This executor identifies nodes that serve as a fact-level source R-value
 * — i.e., a readable value, constant, or expression being asserted as true
 * in a fact, rule condition, or knowledge base entry.
 * 
 * Applies specifically to folder ID '2.2.2.1.1.6'.
 * 
 * Behavior: Self-tags the node with __taggedAsFactSourceRvalue = true
 * 
 * This is distinct from general SourceRvalue because it signals participation
 * in declarative fact assertion rather than procedural data flow or calculation.
 * Critical for forward-chaining engines to know when a value is part of a
 * persistent truth vs. transient computation.
 * 
 * Pure self-declaration — no scanning of neighbors or external mutations.
 */

export default function FactSourceRvalue_2_2_2_1_1_6() {
  // Executive only — no UI
  return null;
}

export const execute = (sequence: any[], log: (msg: any, style?: string) => void) => {
  const factSourceRvalueIds = ['2.2.2.1.1.6'];

  for (let i = 0; i < sequence.length; i++) {
    const node = sequence[i];

    if (!factSourceRvalueIds.includes(node?.parentFolderId)) continue;

    if (!node.attributes) node.attributes = {};

    if (node.attributes.__taggedAsFactSourceRvalue === undefined) {
      node.attributes.__taggedAsFactSourceRvalue = true;

      log(
        `Fact Source R-value recognized at position ${i} (${node.parentFolderId})`,
        'color:#00695c;background:rgba(0,105,92,0.1);padding:2px 6px;border-radius:4px;font-weight:bold;'
      );
    }
  }
};