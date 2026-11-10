/**
 * =============================================================================
 * SEQUENCE PARSER — Semantic gateway for all structured sequences
 * =============================================================================
 *
 * Validates and classifies incoming sequences — knows the difference between
 * logic queries and executable actions.
 *
 * This is the type checker + dispatcher.
 * The containsVirtualizedAction() function is the single bit that decides:
 * "Is this just reasoning… or are we about to change reality?"
 */

import type { StructuredSequence } from '@/types/sequence.types';

/**
 * Parses a JSON string into a validated StructuredSequence (v2 only)
 */
export function parseStructuredSequence(content: string): StructuredSequence | null {
  try {
    const parsed = JSON.parse(content);
    if (parsed.type !== 'structured_sequence_v2') {
      console.warn('Unsupported sequence version:', parsed.type);
      return null;
    }
    return parsed as StructuredSequence;
  } catch (err) {
    console.error('Failed to parse sequence JSON', err);
    return null;
  }
}

/**
 * Checks if the sequence starts with the literal "If" node (legacy behavior)
 * Keeping this for backward compatibility with old banner
 */
export function isLogicQuery(seq: StructuredSequence): boolean {
  return seq.sequence[0]?.parentFolderId === '2.2.2.2.1';
}

/**
 * NEW: Detects if ANY node in the sequence is a virtualized action
 * (i.e. lives under 2.1.9 → Extract, Copy, Flip, Add, etc.)
 */
export function containsVirtualizedAction(seq: StructuredSequence): boolean {
  return seq.sequence.some((node) => {
    const id = node.parentFolderId ?? node.id;
    return id === '2.2.2.2' || id?.startsWith('2.2.2.2.');
  });
}

/**
 * =============================================================================
 * VALIDATION RULES — Define what makes a sequence invalid
 * =============================================================================
 *
 * This function defines invalid sequences according to ontological grammar.
 * Current rule: "And" (2.2.2.2) cannot appear twice consecutively.
 * Example: rotate → and → and → spin → invalid
 */
export function hasConsecutiveAndNodes(seq: StructuredSequence): boolean {
  const nodes = seq.sequence;

  for (let i = 0; i < nodes.length - 1; i++) {
    const current = nodes[i];
    const next = nodes[i + 1];

    const currentIsAnd = current.parentFolderId === '2.2.2.2';
    const nextIsAnd = next.parentFolderId === '2.2.2.2';

    if (currentIsAnd && nextIsAnd) {
      return true; // Found consecutive "And" nodes → invalid
    }
  }

  return false;
}