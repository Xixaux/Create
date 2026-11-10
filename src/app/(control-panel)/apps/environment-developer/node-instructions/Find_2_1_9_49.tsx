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
  pathOptions: any;
  onUpdate?: (data: any) => void;
  createdThings?: Array<{ id: string; name: string }>;
};

const PHYSICAL_OBJECT_PATH = '1';

const isUnderPath = (nodeId: string): boolean => {
  if (!nodeId?.startsWith('created_')) return false;
  const match = nodeId.match(/^created_(?:\d+_)*(.+)$/);
  if (!match) return false;
  const path = match[1];
  return path === PHYSICAL_OBJECT_PATH || path.startsWith(PHYSICAL_OBJECT_PATH + '.');
};

export default function Find_2_1_9_49({ pathOptions, onUpdate, createdThings = [] }: Props) {
  const currentId = pathOptions.nodeDefinition?.findId || '';

  const [findId, setFindId] = useState(currentId);

  const physicalObjects = useMemo(
    () => createdThings.filter((n) => isUnderPath(n.id)),
    [createdThings]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (findId) {
        const node = physicalObjects.find((n) => n.id === findId);
        if (node) {
          onUpdate?.({
            nodeDefinition: {
              findId: node.id,
              findName: node.name ?? 'Unnamed',
              display: `Find: ${node.name ?? 'Object'}`,
            },
          });
        }
      } else {
        onUpdate?.({ nodeDefinition: {} });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [findId, physicalObjects, onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Find Object
      </Typography>

      <FormControl fullWidth size="small">
        <InputLabel>Select object to find</InputLabel>
        <Select
          value={findId}
          label="Select object to find"
          onChange={(e) => setFindId(e.target.value as string)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {physicalObjects.length > 0 ? (
            physicalObjects.map((node) => (
              <MenuItem key={node.id} value={node.id}>
                {node.name ?? 'Unnamed'} ({node.id.replace(/^created_(?:\d+_)*(.+)$/, '$1')})
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No physical objects created yet</MenuItem>
          )}
        </Select>
      </FormControl>

      {pathOptions.nodeDefinition?.display && (
        <Box sx={{ mt: 2 }}>
          <Chip label={pathOptions.nodeDefinition.display} color="warning" size="small" />
        </Box>
      )}
    </Box>
  );
}