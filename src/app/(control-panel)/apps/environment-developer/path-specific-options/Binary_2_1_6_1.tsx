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

const PATHS = {
  X: '2.1.3.1',
  Y: '2.1.3.2',
} as const;

const isUnderPath = (nodeId: string, basePath: string): boolean => {
  if (!nodeId?.startsWith('created_')) return false;
  const match = nodeId.match(/^created_(?:\d+_)*(.+)$/);
  if (!match) return false;
  const path = match[1];
  return path === basePath || path.startsWith(basePath + '.');
};

export default function Binary_2_1_6_1({
  currentNodeId,
  onUpdate,
  pinnedNodes = [],
  pathOptions = {},
}: Props) {
  const [selectedXId, setSelectedXId] = useState<string>('');
  const [selectedYId, setSelectedYId] = useState<string>('');

  const xFiles = useMemo(
    () => pinnedNodes.filter((n) => isUnderPath(n.id, PATHS.X)),
    [pinnedNodes]
  );

  const yFiles = useMemo(
    () => pinnedNodes.filter((n) => isUnderPath(n.id, PATHS.Y)),
    [pinnedNodes]
  );

  // Load existing assignment (if any) from the flat trait at this exact path
  useEffect(() => {
    const existing = pathOptions?.assignedTraits?.[currentNodeId];
    setSelectedXId(existing?.xId || '');
    setSelectedYId(existing?.yId || '');
  }, [pathOptions?.assignedTraits?.[currentNodeId], currentNodeId]);

  // Push update whenever selection changes — flat, symbolic, uniform
  useEffect(() => {
    if (selectedXId && selectedYId) {
      const xNode = xFiles.find((f) => f.id === selectedXId);
      const yNode = yFiles.find((f) => f.id === selectedYId);

      if (xNode && yNode) {
        onUpdate({
          assignedTraits: {
            // Key = the path itself — exactly like Location, Color, etc.
            [currentNodeId]: {
              xId: xNode.id,
              xName: xNode.name ?? 'Unnamed',
              yId: yNode.id,
              yName: yNode.name ?? 'Unnamed',
              // Human-readable summary for immediate feedback
              display: `${xNode.name ?? 'X'} ↔ ${yNode.name ?? 'Y'}`,
            },
          },
        });
      }
    } else {
      // If incomplete, remove the trait entirely
      onUpdate({
        assignedTraits: {
          [currentNodeId]: null, // or undefined — your parent likely filters out nulls
        },
      });
    }
  }, [
    selectedXId,
    selectedYId,
    xFiles,
    yFiles,
    currentNodeId,
    onUpdate,
  ]);

  const isBinaryPath = currentNodeId === '2.1.6.1' || currentNodeId.startsWith('2.1.6.1.');

  if (!isBinaryPath) return null;

  const currentTrait = pathOptions?.assignedTraits?.[currentNodeId];

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
        Assign X (Positive / Active pole)
      </Typography>
      <FormControl size="small" fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select X</InputLabel>
        <Select
          value={selectedXId}
          onChange={(e) => setSelectedXId(e.target.value as string)}
          label="Select X"
        >
          <MenuItem value="">None</MenuItem>
          {xFiles.length > 0 ? (
            xFiles.map((file) => (
              <MenuItem key={file.id} value={file.id}>
                {file.name ?? 'Unnamed'} ({file.id.replace(/^created_(?:\d+_)*(.+)$/, '$1')})
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No options under 2.1.3.1</MenuItem>
          )}
        </Select>
      </FormControl>

      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
        Assign Y (Negative / Passive pole)
      </Typography>
      <FormControl size="small" fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Y</InputLabel>
        <Select
          value={selectedYId}
          onChange={(e) => setSelectedYId(e.target.value as string)}
          label="Select Y"
        >
          <MenuItem value="">None</MenuItem>
          {yFiles.length > 0 ? (
            yFiles.map((file) => (
              <MenuItem key={file.id} value={file.id}>
                {file.name ?? 'Unnamed'} ({file.id.replace(/^created_(?:\d+_)*(.+)$/, '$1')})
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No options under 2.1.3.2</MenuItem>
          )}
        </Select>
      </FormControl>

      {currentTrait?.display && (
        <Box sx={{ mt: 2 }}>
          <Chip
            label={`Binary: ${currentTrait.display}`}
            color="primary"
            size="small"
          />
        </Box>
      )}
    </Box>
  );
}