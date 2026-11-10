// src/utils/treeUtils.ts
export type TreeNode = {
  id: string;
  name: string;
  isFolder: boolean;
  assignedAction: string;
  children?: TreeNode[];
  isFile?: boolean;
};

export const findNodeById = (nodes: TreeNode[], id: string): TreeNode | null => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
};

export const insertFileIntoTree = (
  nodes: TreeNode[],
  folderId: string,
  file: TreeNode
): TreeNode[] =>
  nodes.map(node => {
    if (node.id === folderId) {
      return { ...node, children: [...(node.children || []), file] };
    }
    if (node.children) {
      return { ...node, children: insertFileIntoTree(node.children, folderId, file) };
    }
    return node;
  });