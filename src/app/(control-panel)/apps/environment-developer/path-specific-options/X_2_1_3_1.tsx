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

const VALUE_PATH = '2.5'; // Search for created nodes under Value (exact + all children)

const isUnderPath = (nodeId: string, basePath: string): boolean => {
  if (!nodeId?.startsWith('created_')) return false;
  const match = nodeId.match(/^created_(?:\d+_)*(.+)$/);
  if (!match) return false;
  const path = match[1];
  return path === basePath || path.startsWith(basePath + '.');
};

export default function X_2_1_3_1({
  currentNodeId,
  onUpdate,
  pinnedNodes = [],
  pathOptions = {},
}: Props) {
  // Strictly only show when exactly on the template node '2.1.3.1'
  if (currentNodeId !== '2.1.3.1') return null;

  const existing = pathOptions?.assignedTraits?.[currentNodeId] || {};

  const [selectedId, setSelectedId] = useState<string>(existing.valueId || '');

  // Filter all created nodes under 2.5 (includes children — this is correct for trait sources)
  const valueNodes = useMemo(() => {
    return pinnedNodes.filter((node) => isUnderPath(node.id, VALUE_PATH));
  }, [pinnedNodes]);

  // Update parent when selection changes
  useEffect(() => {
    if (selectedId) {
      const node = pinnedNodes.find((n) => n.id === selectedId);
      if (node) {
        onUpdate({
          assignedTraits: {
            [currentNodeId]: {
              valueId: node.id,
              valueName: node.name ?? 'Unnamed',
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
        Assign Value Trait
      </Typography>

      <FormControl fullWidth size="small">
        <InputLabel>Value</InputLabel>
        <Select
          value={selectedId}
          label="Value"
          onChange={(e) => setSelectedId(e.target.value as string)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {valueNodes.length > 0 ? (
            valueNodes.map((node) => (
              <MenuItem key={node.id} value={node.id}>
                {node.name ?? 'Unnamed'} ({node.id.replace(/^created_(?:\d+_)*(.+)$/, '$1')})
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No value nodes created yet (under 2.5)</MenuItem>
          )}
        </Select>
      </FormControl>

      {currentTrait?.valueName && (
        <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip
            label={`Value: ${currentTrait.valueName}`}
            color="primary"
            variant="outlined"
            size="small"
          />
        </Box>
      )}
    </Box>
  );
}