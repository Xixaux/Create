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

const PATHS = { SHAPES_3D: '2.1.2.6.2' } as const;

const isUnderPath = (nodeId: string, basePath: string): boolean => {
  if (!nodeId?.startsWith('created_')) return false;
  const match = nodeId.match(/^created_(?:\d+_)*(.+)$/);
  if (!match) return false;
  return match[1] === basePath || match[1].startsWith(basePath + '.');
};

export default function Shapes3D_2_1_2_6_2({ currentNodeId, onUpdate, pinnedNodes = [], pathOptions = {} }: Props) {
  const [selectedShapeTraitId, setSelectedShapeTraitId] = useState<string>('');

  useEffect(() => {
    setSelectedShapeTraitId(pathOptions?.assignedTraits?.shape?.id || '');
  }, [pathOptions]);

  const shapeFiles = pinnedNodes.filter(n => isUnderPath(n.id, PATHS.SHAPES_3D));

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500, mt: 2 }}>
        Assign Shape
      </Typography>
      <FormControl size="small" fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select 3D Shape</InputLabel>
        <Select
          value={selectedShapeTraitId}
          onChange={(e) => {
            setSelectedShapeTraitId(e.target.value);
            const selected = shapeFiles.find(f => f.id === e.target.value);
            if (selected) {
              const rd = selected.attributes?.nodeDefinition || {};
              onUpdate({
                assignedTraits: {
                  ...(pathOptions.assignedTraits || {}),
                  shape: {
                    name: selected.name ?? 'Unnamed',
                    id: selected.id,
                    type: rd.structureType === 'voxel' ? 'voxel' : 'shape',
                    size: rd.size ?? 'unknown',
                    ...rd,
                  },
                },
              });
            }
          }}
          label="Select 3D Shape"
        >
          {shapeFiles.length > 0 ? (
            shapeFiles.map((file) => {
              const rd = file.attributes?.nodeDefinition || {};
              const path = file.id.replace(/^created_(?:\d+_)*(.+)$/, '$1');
              const type = rd.structureType === 'voxel' ? 'Voxel' : 'Shape';
              const size = rd.size ?? '';
              return (
                <MenuItem key={file.id} value={file.id}>
                  {file.name ?? 'Unnamed'} ({path}) — {size} {size && '·'} {type}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem disabled>No 3D shapes defined</MenuItem>
          )}
        </Select>
      </FormControl>

      {pathOptions.assignedTraits?.shape && (
        <Chip
          label={`Shape: ${pathOptions.assignedTraits.shape.name ?? 'Unknown'} (${pathOptions.assignedTraits.shape.size || 'Custom'})`}
          color="info"
          size="small"
          variant="outlined"
        />
      )}
    </Box>
  );
}