'use client';

import React from 'react';

/**
 * UPDATED OBJECTIVE (as of your latest directive):
 * This executor now serves ONE purpose only:
 * When the node with parentFolderId '2.2.2.2.1' (the "if" operator) appears at position 0
 * in a sequence, it recognizes itself and applies a lightweight self-tag.
 * 
 * NO external effects. NO tagging or mutation of adjacent nodes.
 * The previous behavior of tagging the right-hand node as __taggedAsLeftOperand
 * has been fully removed — it was an architectural misstep that introduced
 * unwanted coupling and violated positional purity.
 * 
 * This keeps the mechanism clean, self-contained, and truly declarative:
 * The "if" node declares its own activated state based purely on position,
 * allowing higher-level systems to observe and react if desired,
 * without forcing identity rewriting on neighbors.
 */

export default function IfOperator_2_2_2_2_1() {
  // Purely executive component — no UI needed.
  return null;
}

export const execute = (sequence: any[], log: (msg: any, style?: string) => void) => {
  // Need at least one node (the "if" itself)
  if (sequence.length < 1) return;

  // Only trigger if the first node is exactly the "if" operator
  if (sequence[0]?.parentFolderId !== '2.2.2.2.1') return;

  const ifNode = sequence[0];

  // Ensure attributes exist
  if (!ifNode.attributes) ifNode.attributes = {};

  // Apply self-recognition tag only once
  if (ifNode.attributes.__recognizedAsIfOperator === undefined) {
    ifNode.attributes.__recognizedAsIfOperator = true;

    log(
      `"if" operator recognized at position 0 (self-activation only)`,
      'color:#00e5ff; font-weight:800; background:rgba(0, 229, 255, 0.1); padding:2px 6px; border-radius:4px;'
    );
  }

  // Intentionally do NOTHING else.
  // No access to sequence[1], no tagging of neighbors, no assumptions about structure.
};