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

const PATHS = { COLOR: '2.3.1' } as const;

const isUnderPath = (nodeId: string, basePath: string): boolean => {
  if (!nodeId?.startsWith('created_')) return false;
  const match = nodeId.match(/^created_(?:\d+_)*(.+)$/);
  if (!match) return false;
  return match[1] === basePath || match[1].startsWith(basePath + '.');
};

export default function Color_2_3_1({ currentNodeId, onUpdate, pinnedNodes = [], pathOptions = {} }: Props) {
  const [selectedColorTraitId, setSelectedColorTraitId] = useState<string>('');

  useEffect(() => {
    setSelectedColorTraitId(pathOptions?.assignedTraits?.color?.id || '');
  }, [pathOptions]);

  const colorFiles = pinnedNodes.filter(n => isUnderPath(n.id, PATHS.COLOR));

  // This file is only used when Solid imports it, but we also allow direct use
  if (!colorFiles.length && currentNodeId !== PATHS.COLOR) return null;

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
        Apply Color
      </Typography>
      <FormControl size="small" fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Color</InputLabel>
        <Select
          value={selectedColorTraitId}
          onChange={(e) => {
            setSelectedColorTraitId(e.target.value);
            const selected = colorFiles.find(f => f.id === e.target.value);
            if (selected) {
              onUpdate({
                assignedTraits: {
                  ...(pathOptions.assignedTraits || {}),
                  color: { name: selected.name ?? 'Unnamed', id: selected.id },
                },
              });
            }
          }}
          label="Select Color"
        >
          {colorFiles.length > 0 ? (
            colorFiles.map((file) => (
              <MenuItem key={file.id} value={file.id}>
                {file.name ?? 'Unnamed'} ({file.id.replace(/^created_(?:\d+_)*(.+)$/, '$1')})
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No colors defined</MenuItem>
          )}
        </Select>
      </FormControl>

      {pathOptions.assignedTraits?.color && (
        <Chip label={`Color: ${pathOptions.assignedTraits.color.name ?? 'Unknown'}`} color="primary" size="small" />
      )}
    </Box>
  );
}