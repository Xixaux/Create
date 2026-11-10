'use client';

import React from 'react';

/**
 * SourceRvalue_2_2_2_1_1_4.tsx
 * 
 * This executor identifies and tags nodes that serve as the source R-value
 * (right-hand side readable value) in a logic, assignment, or expression context.
 * 
 * Applies to folder ID '2.2.2.1.1.4' — typically a constant, variable, property,
 * or expression that provides a value to be read or copied (e.g., the value on
 * the right side of an assignment, or the source in a comparison or calculation).
 * 
 * Behavior: When such a node appears in a sequence, it self-tags with
 * __taggedAsSourceRvalue = true
 * 
 * This tag will be used during logic resolution to distinguish readable sources
 * from writable targets, enabling proper assignment directionality, data flow
 * tracking, and expression evaluation.
 * 
 * No neighbor analysis required. No mutation of other nodes. Pure self-declaration.
 */

export default function SourceRvalue_2_2_2_1_1_4() {
  // Purely executive — no rendering needed
  return null;
}

export const execute = (sequence: any[], log: (msg: any, style?: string) => void) => {
  // Define the folder ID(s) this executor applies to.
  // Extend if additional source R-value nodes are introduced later.
  const sourceRvalueIds = ['2.2.2.1.1.4'];

  for (let i = 0; i < sequence.length; i++) {
    const node = sequence[i];

    if (!sourceRvalueIds.includes(node?.parentFolderId)) continue;

    // Ensure attributes object exists
    if (!node.attributes) node.attributes = {};

    // Self-tag only once to prevent redundant logging
    if (node.attributes.__taggedAsSourceRvalue === undefined) {
      node.attributes.__taggedAsSourceRvalue = true;

      log(
        `Source R-value recognized at position ${i} (${node.parentFolderId})`,
        'color:#2196f3;background:rgba(33,150,243,0.1);padding:2px 6px;border-radius:4px;font-weight:bold;'
      );
    }
  }

  // Fully self-contained — no external side effects.
};