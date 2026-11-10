'use client';

import React from 'react';

/**
 * THIS FILE IS HEAVILY COMMENTED ON PURPOSE. ENSURE THE METHODOLOGY IS FULLY UNDERSTAND BEFORE MODIFYING
 * OBJECTIVE SUMMARY:
 * This file implements a positional tagging mechanism for the Comparison Operator role
 * (recognized by the LeftOperand executor with identity '2.2.2.1.1.1.1').
 * 
 * When a node carrying __taggedAsComparisonOperator === '2.2.2.1.1.1.1' appears in a sequence,
 * the IMMEDIATE NEXT node (one position to its right) gets a persistent attribute:
 *   __taggedAsRightOperand = '2.2.2.1.1.2'
 * 
 * This completes the core conditional structure:
 *   [if] → [left operand] → [comparison operator] → [right operand]
 * 
 * Nothing else happens. No evaluation. No assumptions about values.
 * We only rewrite identity based on position.
 * 
 * VISUAL INDICATOR NOTE:
 * When rendering badges for __taggedAsRightOperand in the UI,
 * consider using a distinct color (e.g., purple #9333ea or magenta #c51b8a)
 * to clearly indicate "right operand" role.
 * 
 * In short: We do not evaluate the comparison — we declare the right operand via adjacency.
 * Positional tagging = flexible, emergent, lambda-pure.
 */

export default function ComparisonOperator_2_2_2_1_1_7() {
  // No UI rendering needed — this component exists purely for the execute function.
  return null;
}

export const execute = (sequence: any[], log: (msg: any, style?: string) => void) => {
  // Need at least two nodes: the comparison operator and the one to its right.
  if (sequence.length < 2) return;

  // Scan the entire sequence — the rule is adjacency-based.
  for (let i = 0; i < sequence.length - 1; i++) {
    const current = sequence[i];
    const next = sequence[i + 1];

    // Check for the canonical comparison operator identity set by LeftOperand executor
    if (current.attributes?.__taggedAsComparisonOperator !== '2.2.2.1.1.1.1') continue;

    // Ensure attributes exist on the next node
    if (!next.attributes) next.attributes = {};

    // Apply the right operand identity if not already present
    if (next.attributes.__taggedAsRightOperand === undefined) {
      next.attributes.__taggedAsRightOperand = '2.2.2.1.1.2';

      log(
        `Comparison operator detected → node at position ${i + 1} tagged as Right Operand (identity 2.2.2.1.1.2)`,
        'color:#c51b8a;background:rgba(197,27,138,0.1);padding:2px 6px;border-radius:4px;font-family:monospace;font-weight:bold;'
      );
    }
  }
};