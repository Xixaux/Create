'use client';

import React from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import type { PinnedNode } from '@/hooks/useEnvironment';

interface NodeSearchProps {
  /** Current search query */
  searchQuery: string;
  /** Called when user types */
  onSearchChange: (query: string) => void;
  /** All created nodes (pinnedNodes from your env) */
  nodes: PinnedNode[];
  /** Called when user selects a result */
  onNodeSelect: (nodeId: string) => void;
  
  /** Optional placeholder */
  placeholder?: string;
}

/**
 * Live search dropdown for created_* nodes.
 * Searches: name, fullPath, and ALL attributes (Location, Profession, Age, custom traits, etc.)
 * Clicking a result calls onNodeSelect(node.id) and clears the query.
 */
export default function NodeSearch({
  searchQuery,
  onSearchChange,
  nodes,
  onNodeSelect,
  placeholder = 'Search by Location, Profession, Age...',
}: NodeSearchProps) {
  const q = searchQuery.trim().toLowerCase();

  const matches = React.useMemo(() => {
    if (!q) return [];

    return nodes
      .filter((node): node is PinnedNode => 
        node.id.startsWith('created_') && !!node.attributes
      )
      .filter((node) => {
        // Search name & path
        if (node.name.toLowerCase().includes(q)) return true;
        if (node.fullPath.toLowerCase().includes(q)) return true;

        // Search every attribute value (including nested .name)
        return Object.values(node.attributes!).some((val) => {
          if (typeof val === 'string') return val.toLowerCase().includes(q);
          
          if (typeof val === 'number') return String(val).includes(q);
          if (val && typeof val === 'object' && 'name' in val) {
            return String(val.name).toLowerCase().includes(q);
          }
          return false;
        });
      })
      .slice(0, 25); // reasonable cap
  }, [q, nodes]);

  return (
    <Box sx={{ position: 'relative' }}>
      <TextField
        placeholder={placeholder}
        size="small"
        fullWidth
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{
          '& .MuiInputBase-input': { fontSize: '0.85rem' },
          '& .MuiOutlinedInput-root': { borderRadius: '6px' },
        }}
      />

      {q && (
        <Paper
          elevation={8}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            maxHeight: '360px',
            overflowY: 'auto',
            zIndex: 20,
            borderRadius: '0 0 6px 6px',
            border: '1px solid',
            borderColor: 'divider',
            borderTop: 'none',
          }}
        >
          {matches.length === 0 ? (
            <Box sx={{ p: 2, color: 'text.secondary', fontStyle: 'italic' }}>
              No matches found
            </Box>
          ) : (
            matches.map((node) => (
              <Box
                key={node.id}
                onClick={() => {
                  onNodeSelect(node.id);
                  onSearchChange(''); // clear search after selection
                }}
                sx={{
                  p: 1.8,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'action.hover' },
                  '&:last-child': { borderBottom: 'none' },
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 500, lineHeight: 1.2 }}>
                  {node.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  {node.fullPath}
                </Typography>
                {node.attributes && (
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: '0.75rem',
                      color: 'primary.light',
                      fontFamily: 'monospace',
                    }}
                  >
                    {Object.entries(node.attributes)
                      .filter(([k]) => !['CreateTime', 'User', 'AccessLevel'].includes(k))
                      .map(([k, v]) => {
                        const display = typeof v === 'object' && v !== null && 'name' in v ? v.name : v;
                        return `${k}: ${display}`;
                      })
                      .join(' • ')}
                  </Typography>
                )}
              </Box>
            ))
          )}
        </Paper>
      )}
    </Box>
  );
}