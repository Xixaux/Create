'use client';

import React from 'react';

/**
 * TargetLvalue_2_2_2_1_1_3.tsx
 * 
 * This executor identifies and tags nodes that serve as the target L-value
 * (left-hand side assignable value) in a logic or assignment expression.
 * 
 * Typically applies to folder ID '2.2.2.1.1.3' — representing a variable, property,
 * or mutable reference that can appear on the left side of an assignment or
 * be the target of a modification in a logic sequence.
 * 
 * Behavior: When such a node appears in a sequence, it self-tags with
 * __taggedAsTargetLvalue = true
 * 
 * This tag will later be used during logic resolution to identify writable
 * targets (e.g., for assignment, increment, state updates, etc.).
 * 
 * No neighbor scanning. No mutation of other nodes. Pure self-declaration.
 */

export default function TargetLvalue_2_2_2_1_1_3() {
  // Purely executive — no UI component needed
  return null;
}

export const execute = (sequence: any[], log: (msg: any, style?: string) => void) => {
  // Define the folder ID(s) this executor applies to.
  // Extend this array if additional target L-value nodes are added in the future.
  const targetLvalueIds = ['2.2.2.1.1.3'];

  for (let i = 0; i < sequence.length; i++) {
    const node = sequence[i];

    if (!targetLvalueIds.includes(node?.parentFolderId)) continue;

    // Ensure attributes object exists
    if (!node.attributes) node.attributes = {};

    // Self-tag only once to avoid duplicate logs
    if (node.attributes.__taggedAsTargetLvalue === undefined) {
      node.attributes.__taggedAsTargetLvalue = true;

      log(
        `Target L-value recognized at position ${i} (${node.parentFolderId})`,
        'color:#9c27b0;background:rgba(156,39,176,0.1);padding:2px 6px;border-radius:4px;font-weight:bold;'
      );
    }
  }

  // Fully self-contained — no side effects on surrounding nodes.
};