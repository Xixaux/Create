// src/components/UniversalTreeView.tsx
'use client';

import React from 'react';
import { TreeView, TreeItem } from '@mui/x-tree-view';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import { TreeNode } from '../utils/treeUtils';

interface Props {
  treeData: TreeNode[];
}

const FILE_COLOR = '#32CD32';

const UniversalTreeView: React.FC<Props> = ({ treeData }) => {
  const renderNode = (node: TreeNode) => (
    <TreeItem
      key={node.id}
      nodeId={node.id}
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, py: 0.3 }}>
          {node.isFile ? (
            <>
              <DescriptionIcon sx={{ color: FILE_COLOR, fontSize: 'small' }} />
              <Typography sx={{ color: FILE_COLOR, fontWeight: 500, fontSize: '0.875rem' }}>
                {node.name}
              </Typography>
            </>
          ) : (
            <>
              <FolderIcon sx={{ fontSize: 'small' }} />
              <Box>
                <Typography variant="body2">{node.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {node.assignedAction}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      }
    >
      {node.children?.map(renderNode)}
    </TreeItem>
  );

  return (
    <Box sx={{ mt: 3, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Universal Hierarchy
      </Typography>
      <TreeView sx={{ minHeight: 400 }}>
        {treeData.map(renderNode)}
      </TreeView>
    </Box>
  );
};

export default UniversalTreeView;