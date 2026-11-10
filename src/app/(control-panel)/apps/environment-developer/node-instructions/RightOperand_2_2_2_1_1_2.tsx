'use client';

import React from 'react';

/**
 * RightOperand_2_2_2_1_1_2.tsx
 * 
 * This executor handles self-recognition for nodes that serve as the right-hand operand
 * in a logic comparison expression (e.g., the value or variable being compared against
 * the left operand in ==, >, <, etc.).
 * 
 * Currently, this applies to folder ID '2.2.2.1.1.2' — typically a literal value, variable,
 * or expression placed on the right side of a comparison operator.
 * 
 * Behavior: When such a node appears anywhere in a sequence, it tags itself with
 * __taggedAsRightOperand = true
 * 
 * No scanning of neighbors. No mutation of other nodes. Pure self-declaration.
 */

export default function RightOperand_2_2_2_1_1_2() {
  // Purely executive — no UI needed
  return null;
}

export const execute = (sequence: any[], log: (msg: any, style?: string) => void) => {
  // Define the folder ID(s) this executor applies to.
  // Add more IDs here if other right-operand-capable nodes are introduced later.
  const rightOperandIds = ['2.2.2.1.1.2'];

  for (let i = 0; i < sequence.length; i++) {
    const node = sequence[i];

    if (!rightOperandIds.includes(node?.parentFolderId)) continue;

    // Ensure attributes object exists
    if (!node.attributes) node.attributes = {};

    // Self-tag only once
    if (node.attributes.__taggedAsRightOperand === undefined) {
      node.attributes.__taggedAsRightOperand = true;

      log(
        `Right operand self-recognized at position ${i} (${node.parentFolderId})`,
        'color:#ff9800;background:rgba(255,152,0,0.1);padding:2px 6px;border-radius:4px;font-weight:bold;'
      );
    }
  }

  // No side effects on other nodes — fully self-contained.
};