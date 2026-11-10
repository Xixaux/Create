'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { HierarchyNode } from './environmentTypes';

interface HierarchyActionsPanelProps {
  node: HierarchyNode;
  onRenameNode: (nodeId: string, currentName: string) => void;
  onDeleteNode: (nodeId: string) => void;
}

export default function HierarchyActionsPanel({
  node,
  onRenameNode,
  onDeleteNode,
}: HierarchyActionsPanelProps) {
  const isRootNode = node.id === '1';
  const isFile = node.id.startsWith('created_');

  const handleRename = () => onRenameNode(node.id, node.name);
  const handleDelete = () => onDeleteNode(node.id);

  const safeChildren = node.children || [];

  const createdItemsInFolder = React.useMemo(() => {
    if (!node.isFolder) return [];

    return safeChildren.filter((child) => {
      if (!child.id.startsWith('created_')) return false;
      if (!child.metadata) return false;
      return true;
    });
  }, [node, safeChildren]);

  const renderLibraryList = (
    items: HierarchyNode[],
    emptyMessage: string
  ) => {
    if (items.length === 0) {
      return (
        <Typography
          variant="subtitle2"
          sx={{
            color: '#ffffff',
            fontSize: '0.8rem',
            fontStyle: 'italic',
            opacity: 0.8,
            py: 1,
          }}
        >
          {emptyMessage}
        </Typography>
      );
    }

    return (
      <Box sx={{ mt: 1 }}>
        {items.map((node) => (
          <Box
            key={node.id}
            sx={{
              mb: 2,
              p: 1.5,
              borderRadius: '6px',
              bgcolor: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 500, fontSize: '0.95rem' }}>
              {node.name}
            </Typography>
            <Typography variant="caption" sx={{ color: '#ffffffaa', fontFamily: 'monospace', fontSize: '0.75rem' }}>
              ID: {node.id}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <>
      {/* ==================== NODE ITEMS — FULLY TRANSPARENT ==================== */}
      <Box sx={{ mt: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: '#ffffff', fontWeight: 500, fontSize: '1.1rem' }}
        >
          Node Items ({createdItemsInFolder.length})
        </Typography>

        {node.isFolder ? (
          renderLibraryList(createdItemsInFolder, 'No created items in this folder')
        ) : (
          <Typography sx={{ color: '#ffffff88', fontSize: '0.85rem', fontStyle: 'italic' }}>
            Select a folder to view its items
          </Typography>
        )}
      </Box>

      {/* ==================== NODE ADMINISTRATION — FULLY TRANSPARENT ==================== */}
      <Box sx={{ mt: 5 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: '#ffffff', fontWeight: 500, fontSize: '1.1rem' }}
        >
          Node Administration
        </Typography>

        {/* Default Action Buttons */}
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mt: 2 }}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={handleRename}
            size="small"
            sx={{
              color: '#ffffff',
              borderColor: '#ffffff66',
              '&:hover': { borderColor: '#ffffff', bgcolor: 'rgba(255,255,255,0.1)' },
            }}
          >
            Rename
          </Button>

          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            disabled={isRootNode}
            size="small"
            sx={{
              color: '#ff6b6b',
              borderColor: '#ff6b6b66',
              '&:hover': { borderColor: '#ff6b6b', bgcolor: 'rgba(255,107,107,0.15)' },
            }}
          >
            Delete
          </Button>
        </Box>

        <Typography
          variant="caption"
          sx={{
            mt: 4,
            display: 'block',
            color: '#ffffff88',
            fontSize: '0.8rem',
          }}
        >
          Active <strong>{isFile ? 'File' : 'Folder'}</strong> "
          <strong>{node.name}</strong>".
        </Typography>
      </Box>
    </>
  );
}