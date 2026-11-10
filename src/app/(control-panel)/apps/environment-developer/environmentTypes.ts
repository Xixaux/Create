'use client';

export interface HierarchyNode {
  id: string;
  name: string;
  isFolder: boolean;
  assignedAction?: string;
  children?: HierarchyNode[];
  metadata?: {
    source: string;
    parentFolderId: string;
    fullPath: string;
    pathOptions?: any;
    attributes?: {
      CreateTime: string;
      User: string;
      AccessLevel: string;
    };
  };
}

/* ------------------------------------------------------------------ */
/* -------------------------- ID VALIDATION -------------------------- */
/* ------------------------------------------------------------------ */
const ID_VALIDATION_REGEX = /^\d+(\.\d+)*$/;

const validateRecursiveNodes = (
  nodes: HierarchyNode[],
  expectedDepth: number,
  expectedParentId: string
): boolean => {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    if (!ID_VALIDATION_REGEX.test(node.id)) {
      console.error(`Validation Failed (Format): Invalid ID ${node.id}`);
      return false;
    }

    const idParts = node.id.split('.');
    if (idParts.length !== expectedDepth) {
      console.error(
        `Validation Failed (Structure): ID ${node.id} has ${idParts.length} parts, expected ${expectedDepth}`
      );
      return false;
    }

    if (!node.id.startsWith(expectedParentId + '.')) {
      console.error(
        `Validation Failed (Parent): ID ${node.id} does not start with ${expectedParentId}.`
      );
      return false;
    }

    const expectedIdx = i + 1;
    const actualIdx = parseInt(idParts[idParts.length - 1], 10);
    if (actualIdx !== expectedIdx) {
      console.error(
        `Validation Failed (Sequence): ID ${node.id} should end with ${expectedIdx}, got ${actualIdx}`
      );
      return false;
    }

    if (node.children && Array.isArray(node.children) && node.children.length > 0) {
      if (!validateRecursiveNodes(node.children, expectedDepth + 1, node.id)) {
        return false;
      }
    }
  }
  return true;
};

export const validateImportedHierarchy = (nodes: HierarchyNode[]): boolean => {
  if (nodes.length !== 1 || nodes[0].id !== '1') {
    console.error("Import failed: Must have exactly one root node with ID '1'.");
    return false;
  }
  const root = nodes[0];
  if (root.children && Array.isArray(root.children)) {
    return validateRecursiveNodes(root.children, 2, root.id);
  }
  return true;
};

/* ------------------------------------------------------------------ */
/* --------------------------- UTILITIES ---------------------------- */
/* ------------------------------------------------------------------ */
export const getDeepClone = (nodes: HierarchyNode[]): HierarchyNode[] => {
  return JSON.parse(JSON.stringify(nodes));
};

export const findNodeById = (
  id: string,
  nodes: HierarchyNode[]
): HierarchyNode | undefined => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNodeById(id, node.children);
      if (found) return found;
    }
  }
  return undefined;
};

export const findParentAndChildren = (
  parentId: string,
  nodes: HierarchyNode[]
): HierarchyNode[] | undefined => {
  if (parentId === '1') {
    if (!nodes[0].children) nodes[0].children = [];
    return nodes[0].children;
  }

  const parent = findNodeById(parentId, nodes);
  if (parent && parent.isFolder) {
    if (!parent.children) parent.children = [];
    return parent.children;
  }
  return undefined;
};

export const generateNextHierarchicalId = (
  parentId: string,
  nodes: HierarchyNode[]
): string => {
  const children = findParentAndChildren(parentId, nodes);
  if (!children) return `${parentId}.1`;

  let max = 0;
  children.forEach(c => {
    const parts = c.id.split('.');
    const last = parseInt(parts[parts.length - 1], 10);
    if (!isNaN(last) && last > max) max = last;
  });
  return `${parentId}.${max + 1}`;
};

export const renameNode = (
  nodeId: string,
  newName: string,
  nodes: HierarchyNode[]
): HierarchyNode[] => {
  return nodes.map(node => {
    if (node.id === nodeId) return { ...node, name: newName };
    if (node.children) {
      return { ...node, children: renameNode(nodeId, newName, node.children) };
    }
    return node;
  });
};

export const deleteNode = (
  nodeId: string,
  nodes: HierarchyNode[]
): HierarchyNode[] => {
  return nodes
    .filter(n => n.id !== nodeId)
    .map(node => {
      if (node.children) {
        const newChildren = deleteNode(nodeId, node.children);
        if (newChildren !== node.children) {
          return { ...node, children: newChildren };
        }
      }
      return node;
    });
};

export const getFullPath = (
  nodeId: string,
  nodes: HierarchyNode[]
): string | null => {
  const parts = nodeId.split('.');
  let current = nodes;
  const path: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    const curId = parts.slice(0, i + 1).join('.');
    const node = current.find(n => n.id === curId);
    if (!node) return null;
    path.push(node.name);
    current = node.children || [];
  }
  return path.join('/');
};

/* ------------------------------------------------------------------ */
/* ---------------------- FILE MOVE (created_…) --------------------- */
/* ------------------------------------------------------------------ */
export const moveFileAndUpdateId = (
  fileId: string,
  newParentId: string,
  hierarchy: HierarchyNode[]
): HierarchyNode[] | null => {
  if (!fileId.startsWith('created_')) return null;

  const clone = getDeepClone(hierarchy);
  let fileNode: HierarchyNode | null = null;

  const remove = (nodes: HierarchyNode[]): boolean => {
    for (const n of nodes) {
      if (n.children) {
        const idx = n.children.findIndex(c => c.id === fileId);
        if (idx !== -1) {
          [fileNode] = n.children.splice(idx, 1);
          return true;
        }
        if (remove(n.children)) return true;
      }
    }
    return false;
  };

  if (!remove(clone)) return null;
  if (!fileNode) return null;

  // Preserve original sequence number (critical!)
  const seqMatch = fileId.match(/^created_(\d+)_/);
  const seqNumber = seqMatch ? seqMatch[1] : '1';

  // New format: created_<original_seq>_<newParentId>
  fileNode.id = `created_${seqNumber}_${newParentId}`;

  // Keep metadata in sync
  if (fileNode.metadata) {
    fileNode.metadata.parentFolderId = newParentId;
  }

  const findParent = (nodes: HierarchyNode[]): HierarchyNode | null => {
    for (const n of nodes) {
      if (n.id === newParentId && n.isFolder) return n;
      if (n.children) {
        const found = findParent(n.children);
        if (found) return found;
      }
    }
    return null;
  };

  const newParent = findParent(clone);
  if (!newParent) return null;

  newParent.children = [...(newParent.children || []), fileNode];
  return clone;
};

/* ------------------------------------------------------------------ */
/* -------------------------- ACTION UPDATE -------------------------- */
/* ------------------------------------------------------------------ */
export const updateNodeAction = (
  nodeId: string,
  newAction: string,
  hierarchy: HierarchyNode[]
): HierarchyNode[] => {
  return hierarchy.map(node => {
    if (node.id === nodeId) {
      return { ...node, assignedAction: newAction };
    }
    if (node.children && node.children.length > 0) {
      return {
        ...node,
        children: updateNodeAction(nodeId, newAction, node.children),
      };
    }
    return node;
  });
};