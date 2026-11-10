'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';

type Props = {
  currentNodeId: string;
  onUpdate: (data: any) => void;
  pinnedNodes?: Array<{ id: string; name: string; attributes?: any; nodeDefinition?: any }>;
  pathOptions?: Record<string, any>;
};

const LOGIC_TRAIT_PATHS = [
  { path: '2.2.2.2.2',  allowChildren: false }, // and
  { path: '2.2.2.2.6',  allowChildren: false }, // else
  { path: '2.2.2.2.7',  allowChildren: false }, // elseif
  { path: '2.2.2.2.1',  allowChildren: false }, // if
  { path: '2.2.2.2.10', allowChildren: false }, // nor
  { path: '2.2.2.2.5',  allowChildren: false }, // not
  { path: '2.2.2.2.3',  allowChildren: false }, // or
  { path: '2.2.2.2.8',  allowChildren: false }, // while  <-- Added
  { path: '2.1.3.1',    allowChildren: true  }, // X and all children
  { path: '2.2.2.2.11', allowChildren: false }, // xnor
  { path: '2.2.2.2.4',  allowChildren: false }, // xor
  { path: '2.1.3.2',    allowChildren: true  }, // Y and all children
  { path: '1',          allowChildren: true  }, // Physical thing and all children
];

const isUnderPath = (nodeId: string, basePath: string, allowChildren: boolean): boolean => {
  if (!nodeId?.startsWith('created_')) return false;
  const match = nodeId.match(/^created_(?:\d+_)*(.+)$/);
  if (!match) return false;
  const path = match[1];
  if (allowChildren) {
    return path === basePath || path.startsWith(basePath + '.');
  }
  return path === basePath; // Exact match only
};

export default function Logic_2_2({
  currentNodeId,
  onUpdate,
  pinnedNodes = [],
  pathOptions = {},
}: Props) {
  // Strictly only show when exactly on the template node '2.2'
  if (currentNodeId !== '2.2') return null;

  const existing = pathOptions?.assignedTraits?.[currentNodeId] || {};

  const [selectedId, setSelectedId] = useState<string>(existing.logicId || '');

  // Filter created nodes matching any of the logic trait paths
  const logicNodes = useMemo(() => {
    return pinnedNodes.filter((node) =>
      LOGIC_TRAIT_PATHS.some(({ path, allowChildren }) => isUnderPath(node.id, path, allowChildren))
    );
  }, [pinnedNodes]);

  // Update parent when selection changes
  useEffect(() => {
    if (selectedId) {
      const node = pinnedNodes.find((n) => n.id === selectedId);
      if (node) {
        onUpdate({
          assignedTraits: {
            [currentNodeId]: {
              logicId: node.id,
              logicName: node.name ?? 'Unnamed',
            },
          },
        });
      }
    } else {
      onUpdate({
        assignedTraits: {
          [currentNodeId]: null,
        },
      });
    }
  }, [selectedId, pinnedNodes, currentNodeId, onUpdate]);

  const currentTrait = pathOptions?.assignedTraits?.[currentNodeId];

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 3, fontWeight: 600 }}>
        Assign Logic Trait
      </Typography>

      <FormControl fullWidth size="small">
        <InputLabel>Logic</InputLabel>
        <Select
          value={selectedId}
          label="Logic"
          onChange={(e) => setSelectedId(e.target.value as string)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {logicNodes.length > 0 ? (
            logicNodes.map((node) => (
              <MenuItem key={node.id} value={node.id}>
                {node.name ?? 'Unnamed'} ({node.id.replace(/^created_(?:\d+_)*(.+)$/, '$1')})
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No logic nodes created yet</MenuItem>
          )}
        </Select>
      </FormControl>

      {currentTrait?.logicName && (
        <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip
            label={`Logic: ${currentTrait.logicName}`}
            color="primary"
            variant="outlined"
            size="small"
          />
        </Box>
      )}
    </Box>
  );
}