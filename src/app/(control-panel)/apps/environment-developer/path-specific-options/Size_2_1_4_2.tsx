'use client';

import React, { useState, useEffect } from 'react';
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
  SIZE: '2.1.4.2',
} as const;

const isUnderPath = (nodeId: string, basePath: string): boolean => {
  if (!nodeId?.startsWith('created_')) return false;
  const match = nodeId.match(/^created_(?:\d+_)*(.+)$/);
  if (!match) return false;
  const path = match[1];
  return path === basePath || path.startsWith(basePath + '.');
};

export default function Size_2_1_4_2({ currentNodeId, onUpdate, pinnedNodes = [], pathOptions = {} }: Props) {
  const [selectedNumberTraitId, setSelectedNumberTraitId] = useState<string>('');

  useEffect(() => {
    const traits = pathOptions?.assignedTraits || {};
    setSelectedNumberTraitId(traits.size?.id || '');
  }, [pathOptions]);

  const numberFiles = pinnedNodes.filter(n => isUnderPath(n.id, PATHS.SIZE));

  if (currentNodeId !== PATHS.SIZE) return null;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
        Apply Size
      </Typography>
      <FormControl size="small" fullWidth sx={{ mb: 1 }}>
        <InputLabel>Select Number</InputLabel>
        <Select
          value={selectedNumberTraitId}
          onChange={(e) => {
            setSelectedNumberTraitId(e.target.value);
            const selected = numberFiles.find(f => f.id === e.target.value);
            if (selected) {
              onUpdate({
                assignedTraits: {
                  ...(pathOptions.assignedTraits || {}),
                  size: { name: selected.name ?? 'Unnamed', id: selected.id },
                },
              });
            }
          }}
          label="Select Number"
        >
          {numberFiles.length > 0 ? (
            numberFiles.map((f) => (
              <MenuItem key={f.id} value={f.id}>
                {f.name ?? 'Unnamed'} ({f.id.replace(/^created_(?:\d+_)*(.+)$/, '$1')})
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No numbers defined</MenuItem>
          )}
        </Select>
      </FormControl>

      {pathOptions.assignedTraits?.size && (
        <Chip
          label={`Size: ${pathOptions.assignedTraits.size.name ?? 'Unknown'}`}
          color="primary"
          size="small"
        />
      )}
    </Box>
  );
}