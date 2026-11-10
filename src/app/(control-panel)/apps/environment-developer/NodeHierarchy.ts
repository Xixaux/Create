// src/app/(control-panel)/apps/environment-developer/NodeHierarchy.ts

'use client';

export type JsonNode = {
  id: string;
  name: string;
  isFolder: boolean;
  children: JsonNode[];
  parent?: JsonNode;
};

// We no longer import environmentDb.json directly (it was inside src → build error)
// Instead, we load it at runtime from the public folder — exactly like everything else does

let physicalNode: JsonNode | undefined;
let abstractNode: JsonNode | undefined;

// Cache to avoid re-fetching
let cachedHierarchy: JsonNode[] | null = null;

async function loadHierarchyFromPublic() {
  if (cachedHierarchy) {
    return cachedHierarchy;
  }

  try {
    const res = await fetch(`/environmentDb.json?t=${Date.now()}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to load environmentDb.json: ${res.status}`);
    }

    const data = await res.json();

    if (!data.currentEnvironmentID || !data.hierarchies?.[data.currentEnvironmentID]) {
      console.warn('Invalid or empty environmentDb.json');
      return [];
    }

    cachedHierarchy = data.hierarchies[data.currentEnvironmentID];
    return cachedHierarchy;
  } catch (err) {
    console.error('Failed to load hierarchy from public/environmentDb.json', err);
    return [];
  }
}

function addParentRefs(node: JsonNode, parent: JsonNode | null = null) {
  node.parent = parent || undefined;
  for (const child of node.children) {
    addParentRefs(child, node);
  }
}

// Initialize on demand (lazy load)
export async function getRootNodes(): Promise<{ physicalNode?: JsonNode; abstractNode?: JsonNode }> {
  if (physicalNode && abstractNode) {
    return { physicalNode, abstractNode };
  }

  const rootNodes = await loadHierarchyFromPublic();

  physicalNode = rootNodes.find((n: JsonNode) => n.id === '1');
  abstractNode = rootNodes.find((n: JsonNode) => n.id === '2');

  if (physicalNode) addParentRefs(physicalNode);
  if (abstractNode) addParentRefs(abstractNode);

  return { physicalNode, abstractNode };
}

// Optional: Synchronous fallback (returns undefined if not loaded yet)
export function getRootNodesSync() {
  return { physicalNode, abstractNode };
}

export type { JsonNode };