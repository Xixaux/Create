'use client';

import React from 'react';

/**
 * UPDATED OBJECTIVE:
 * This executor is responsible for self-recognition of the comparison operator role.
 * 
 * When a node with parentFolderId corresponding to a logic comparison operator
 * (e.g., '2.2.2.1.1.1' for "==", and siblings like '2.2.2.1.1.2' for "!=", etc.)
 * appears in a sequence — regardless of position — it tags ITSELF with:
 *   __taggedAsComparisonOperator = true
 * 
 * No scanning. No adjacency checks. No mutation of other nodes.
 * Pure self-declaration of emergent identity.
 * 
 * This allows higher layers (rendering, simulation, detection) to treat this node
 * as a relational operator when building or interpreting conditional structures,
 * without any forced positional rewriting of neighbors.
 * 
 * Previous behavior (tagging the next node based on a left operand tag) has been
 * removed as it introduced unnecessary coupling.
 */


/**
 * ARCHITECTURAL EVOLUTION SUMMARY (December 2025)
 * 
 * This series of changes represents a deliberate and significant shift in the core philosophy
 * governing how nodes in the sequence system declare and manage emergent roles within conditional
 * (and potentially other) logic structures.
 * 
 * Initial Implementation (Problematic Pattern):
 * Early versions relied on positional adjacency rules where one node would actively reach out
 * and mutate the attributes of its neighbor(s). For example:
 *   - The "if" operator (2.2.2.2.1) at position 0 would tag the next node as __taggedAsLeftOperand.
 *   - A separate executor would then detect that tag and tag the following node as __taggedAsComparisonOperator.
 * This created a chain of forced identity rewriting based on proximity, producing a fragile,
 * tightly coupled system where the presence of one node imperatively altered the persistent
 * identity of another.
 * 
 * While inspired by term-rewriting systems (lambda calculus, SKI combinators), this approach
 * introduced several architectural risks:
 *   - Violation of node self-containment: Each node type is designed to be independently defined
 *     and reusable. Allowing one node to mutate another's attributes broke encapsulation and
 *     made behavior harder to predict, especially in nested or dynamically reordered sequences.
 *   - Hidden dependencies and side effects: Debugging became complex because a node's effective
 *     role depended not just on its own definition but on what its neighbors decided to do to it.
 *   - Scalability concerns: With hundreds of node types, proliferating inter-node mutation rules
 *     would eventually lead to an unmaintainable web of implicit contracts.
 *   - Risk of imperative creep: The system aims for declarative, emergent logic. Forcing identity
 *     changes felt too much like traditional control flow imposed from the outside.
 * 
 * Current Refactored Approach (Self-Contained Declarative Tagging):
 * All external mutation has been systematically removed. Each executor now performs only
 * self-recognition and self-tagging based on its own intrinsic properties (folder ID) and,
 * where relevant, its position in the sequence.
 * 
 * Key examples:
 *   - The "if" operator (2.2.2.2.1) now solely tags itself with __recognizedAsIfOperator when
 *     at position 0 — no effect on neighbors.
 *   - Comparison operator nodes (==, !=, <, >, <=, >=) tag themselves with __taggedAsComparisonOperator
 *     whenever they appear, regardless of position or context.
 * 
 * Implications and Benefits:
 *   1. True node independence: Every node fully controls its own attributes. Roles emerge
 *      from observation of individual self-declarations rather than enforced rewriting chains.
 *   2. Predictable behavior: The meaning and state of any node can be understood in isolation
 *      or through higher-level pattern detection, without hidden side effects from adjacency.
 *   3. Easier maintenance and extension: Adding new node types or roles no longer risks
 *      introducing cross-mutation bugs. New emergent behaviors can be built by observing
 *      combinations of self-tags rather than adding more inter-node rules.
 *   4. Preserved declarative purity: The system remains closer to the original vision of
 *      positional, emergent logic without descending into imperative semantics.
 *   5. Improved debugging and observability: Logs and badges now reflect intentional,
 *      self-declared states instead of externally imposed ones.
 * 
 * Future Direction:
 * Higher-level systems (sequence detectors, evaluators, visualizers, simulators) should
 * continue to interpret patterns by reading these self-applied tags in combination with
 * positional and hierarchical context — never by expecting one node to have forced a state
 * onto another. This keeps the architecture flexible, scalable, and true to the principle
 * that meaning arises from composition of independent, self-aware primitives.
 * 
 * These changes strengthen the foundation for handling hundreds (and eventually thousands)
 * of node types while preserving clarity, extensibility, and ideological consistency.
 */
 
 
export default function ComparisonOperatorExecutor() {
  // No UI — purely executive
  return null;
}

export const execute = (sequence: any[], log: (msg: any, style?: string) => void) => {
  // Define which folder IDs this executor applies to (the 6 comparison operators)
  const comparisonOperatorIds = [
    '2.2.2.1.1.1',  // ==
    '2.2.2.1.1.2',  // !=
    '2.2.2.1.1.3',  // <
    '2.2.2.1.1.4',  // >
    '2.2.2.1.1.5',  // <=
    '2.2.2.1.1.6',  // >=
  ];

  for (let i = 0; i < sequence.length; i++) {
    const node = sequence[i];

    // Skip if not one of the comparison operator nodes
    if (!comparisonOperatorIds.includes(node?.parentFolderId)) continue;

    // Ensure attributes exist
    if (!node.attributes) node.attributes = {};

    // Self-tag only once
    if (node.attributes.__taggedAsComparisonOperator === undefined) {
      node.attributes.__taggedAsComparisonOperator = true;

      log(
        `Comparison operator self-recognized at position ${i} (${node.parentFolderId})`,
        'color:#13c2c2;background:rgba(19,194,194,0.1);padding:2px 6px;border-radius:4px;font-weight:bold;'
      );
    }
  }

  // Intentionally affects nothing else.
};