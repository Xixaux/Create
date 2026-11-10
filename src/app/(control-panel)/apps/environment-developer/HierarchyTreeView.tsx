'use client';

import React from 'react';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import CodeIcon from '@mui/icons-material/Code';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { HierarchyNode } from './environmentTypes';
import ViewInArTwoToneIcon from '@mui/icons-material/ViewInArTwoTone';

// Helper: Get icon based on node type
const getNodeIcon = (node: HierarchyNode) => {
  // Folders = 3D cube
  if (node.isFolder) {
    return <ViewInArIcon sx={{ mr: 1, color: '#00A4EF', fontSize: 20 }} />;
  }

  // All created_ nodes and regular files = pencil
  if (node.id.startsWith('created_') || !node.isFolder) {
    return <EditIcon sx={{ mr: 1, color: '#00A4EF', fontSize: 18 }} />;
  }

  // Fallback smart detection
  const name = node.name.toLowerCase();
  if (/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(name)) {
    return <ImageIcon sx={{ mr: 1 }} color="primary" />;
  }
  if (/\.(js|ts|jsx|tsx|json)$/i.test(name)) {
    return <CodeIcon sx={{ mr: 1 }} color="success" />;
  }
  if (/\.(obj|fbx|glb|gltf)$/i.test(name)) {
    return <ViewInArTwoToneIcon sx={{ mr: 1 }} color="secondary" />;
  }

  return <EditIcon sx={{ mr: 1, color: '#00A4EF' }} />;
};

// Recursive Tree Node Component — NO React.memo to ensure updates propagate
const TreeNode: React.FC<{
  node: HierarchyNode;
  onEdit?: (node: HierarchyNode) => void;
}> = ({ node, onEdit }) => {
  const icon = getNodeIcon(node);

  return (
    <TreeItem
      itemId={node.id}
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 1 }}>
          {icon}
          <Box sx={{ flexGrow: 1 }}>{node.name}</Box>
          {/* Pencil button for created_ nodes */}
          {node.id.startsWith('created_') && onEdit && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(node);
              }}
              sx={{ ml: 1, opacity: 0.7, '&:hover': { opacity: 1 } }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      }
    >
      {/* Render children if they exist */}
      {Array.isArray(node.children) &&
        node.children.map((child) => (
          <TreeNode key={child.id} node={child} onEdit={onEdit} />
        ))}
    </TreeItem>
  );
};

interface HierarchyTreeViewProps {
  data: HierarchyNode[];
  onNodeSelect: (event: React.SyntheticEvent, nodeId: string | null) => void;
  selectedNodeId: string | null;
  expandedIds: Set<string>;
  onExpandedChange: (ids: Set<string>) => void;
  onEdit?: (node: HierarchyNode) => void;
}

export default function HierarchyTreeView({
  data,
  onNodeSelect,
  selectedNodeId,
  expandedIds,
  onExpandedChange,
  onEdit,
}: HierarchyTreeViewProps) {
  const expandedItems = Array.from(expandedIds);

  // Force full remount when data changes (solves stale view on refresh)
  const treeKey = data.length > 0 ? data.map(n => n.id + n.name).join('|') : 'empty';

  return (
    <SimpleTreeView
      key={treeKey}  // <-- This forces the tree to remount and show fresh data
      aria-label="hierarchy navigator"
      onSelectedItemsChange={(event, items) =>
        onNodeSelect(event, Array.isArray(items) ? items[0] || null : items)
      }
      selectedItems={selectedNodeId}
      expandedItems={expandedItems}
      onExpandedItemsChange={(_, newIds) => onExpandedChange(new Set(newIds))}
      sx={{
        flexGrow: 1,
        overflowY: 'auto',
        p: 1,
      }}
    >
      {data.map((node) => (
        <TreeNode key={node.id} node={node} onEdit={onEdit} />
      ))}
    </SimpleTreeView>
  );
}