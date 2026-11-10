// src/app/(control-panel)/apps/environment-developer/traitRegistry.ts
'use client';

/**
 * =============================================================================
 * TRAIT REGISTRY – CENTRALIZED, DECLARATIVE TRAIT SYSTEM
 * =============================================================================
 *
 * traitRegistry.ts is a centralized blueprint that defines what kinds of traits (like color or material) can be applied to specific folders in your hierarchy — but only if real things actually exist to provide them. It maps each trait to a pathPrefix (where its options live) and appliesTo (which folders can use it), enabling dynamic, safe UI in the app. Hardcoded entries are design rules, not data — they only activate when matching files are created under their pathPrefix, enforcing the Golden Rule: "No thing, no trait."
 *
 *
 * GOLDEN RULE OF TRAIT APPLICATION:
 *   "You can only apply a trait if a real 'thing' exists to provide it."
 *   → Example: Cannot apply "silk" material unless a "silk" thing was created under 2.3.2.*
 *   → This is enforced in EnvironmentDeveloperApp.tsx via `eligibleTraits` filter
 *   → Trait UI only appears when at least one valid option exists in pinnedNodes
 *
 * PURPOSE:
 *   • Define **all possible traits** (color, material, glow, etc.)
 *   • Map each trait to:
 *       - `pathPrefix`: Where its options live (e.g., 2.3.1.* for colors)
 *       - `appliesTo`: Which **folder IDs** can receive this trait
 *   • Enables **conditional dynamic UI** in EnvironmentDeveloperApp
 *
 * SCALABILITY:
 *   • Add a new trait → just add one object
 *   • No code changes in UI
 *   • Fully type-safe
 */

export type Trait = {
  /**
   * Unique identifier for the trait (used as key in attributes)
   * Example: 'color', 'material', 'glow'
   */
  id: string;

  /**
   * Human-readable name shown in UI dropdown
   */
  name: string;

  /**
   * Path prefix in hierarchy where trait options are stored
   * Example: '2.3.1' → all files under created_2.3.1.*
   */
  pathPrefix: string;

  /**
   * Array of folder IDs that are allowed to apply this trait
   * Example: ['1.1.1.5'] → only Plastic folder
   */
  appliesTo: string[];

  /**
   * Optional: MUI icon component for future use in UI
   */
  icon?: React.ReactNode;
};

/**
 * =============================================================================
 * TRAIT_REGISTRY – SINGLE SOURCE OF TRUTH
 * =============================================================================
 *
 * Add new traits here. Example:
 *   { id: 'spinning', name: 'Spinning', pathPrefix: '2.3.4', appliesTo: ['1.1.2.1'] }
 */
export const TRAIT_REGISTRY: Trait[] = [
  {
    id: 'color',
    name: 'Color',
    pathPrefix: '2.3.1',
    appliesTo: ['1.1.1.5'], // Plastic folder only
  },
  {
    id: 'material',
    name: 'Material',
    pathPrefix: '2.3.2',
    appliesTo: ['1.1.1.5', '1.1.1.6'], // Plastic & Metal
  },
  {
    id: 'glow',
    name: 'Glow',
    pathPrefix: '2.3.3',
    appliesTo: ['1.1.1.7'], // Fire folder
  },
  {
    id: 'liquid',
    name: 'Liquid State',
    pathPrefix: '2.3.4',
    appliesTo: ['1.1.1.8'], // Liquid folder
  },
  {
    id: 'spinning',
    name: 'Spinning',
    pathPrefix: '2.3.5',
    appliesTo: ['1.1.2.1'], // Ball folder
  },
  {
    id: 'flying',
    name: 'Flying',
    pathPrefix: '2.3.6',
    appliesTo: ['1.1.2.2'], // Bird folder
  },
  {
    id: 'lying',
    name: 'Lying Down',
    pathPrefix: '2.3.7',
    appliesTo: ['1.1.2.3'], // Cat folder
  },
  {
    id: 'happy',
    name: 'Happy Mood',
    pathPrefix: '2.3.8',
    appliesTo: ['1.1.2.4'], // Dog folder
  },
  // Add more traits as needed...
] as const;

/**
 * Helper: Get trait by ID
 */
export const getTraitById = (id: string): Trait | undefined => {
  return TRAIT_REGISTRY.find(t => t.id === id);
};

/**
 * Helper: Get all options for a trait from pinned nodes
 */
export const getTraitOptions = (
  trait: Trait,
  pinnedNodes: any[]
): { id: string; name: string }[] => {
  return pinnedNodes
    .filter(node =>
      typeof node.id === 'string' &&
      node.id.startsWith(`created_${trait.pathPrefix}`)
    )
    .map(node => ({
      id: node.id,
      name: node.name,
    }));
};