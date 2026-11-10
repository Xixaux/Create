// src/core/NodeLaws.ts

import type { PinnedNode } from '@/hooks/useEnvironment';

export type LawViolation = {
  valid: false;
  reason: string;
  blockedBy?: string[];
  suggestion?: string;
};

export type LawResult = { valid: true } | LawViolation;

/**
 * Universal Law #1: No two solid physical objects may occupy the same space
 */
export function enforceNoSpatialOverlap(nodes: PinnedNode[]): LawResult {
  // Find all physical objects that have a location trait applied
  const physicalNodes = nodes.filter((node): node is PinnedNode & {
    attributes: {
      assignedTraits?: {
        location?: {
          x: string;
          y: string;
          z: string;
        };
      };
      // Optional: only block if explicitly marked solid
      solid?: boolean;
    }
  } => {
    const loc = node.attributes?.assignedTraits?.location;
    return !!loc && typeof loc.x === 'string' && typeof loc.y === 'string' && typeof loc.z === 'string';
  });

  if (physicalNodes.length < 2) return { valid: true };

  const occupancy = new Map<string, PinnedNode[]>();

  for (const node of physicalNodes) {
    const { x, y, z } = node.attributes.assignedTraits!.location!;
    const key = `${x.trim()},${y.trim()},${z.trim()}`;

    if (!occupancy.has(key)) occupancy.set(key, []);
    occupancy.get(key)!.push(node);
  }

  const violations: string[] = [];
  for (const [coord, occupants] of occupancy.entries()) {
    if (occupants.length > 1) {
      violations.push(
        `Coordinates ${coord} occupied by: ` +
        occupants.map(n => `"${n.name}"`).join(', ')
      );
    }
  }

  if (violations.length > 0) {
    return {
      valid: false,
      reason: 'Cannot run simulation with two physical objects in the same place at the same time.',
      blockedBy: violations,
      suggestion: 'Change the X, Y, or Z coordinate of one of the objects before running.',
    };
  }

  return { valid: true };
}