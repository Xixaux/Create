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

const PATHS = { COORDINATES_XYZ: '2.1.5.2.1' } as const;

const isUnderPath = (nodeId: string, basePath: string): boolean => {
  if (!nodeId?.startsWith('created_')) return false;
  const match = nodeId.match(/^created_(?:\d+_)*(.+)$/);
  if (!match) return false;
  return match[1] === basePath || match[1].startsWith(basePath + '.');
};

export default function CoordinatesXYZ_2_1_5_2_1({ currentNodeId, onUpdate, pinnedNodes = [], pathOptions = {} }: Props) {
  const [selectedCoordTraitId, setSelectedCoordTraitId] = useState<string>('');

  useEffect(() => {
    setSelectedCoordTraitId(pathOptions?.assignedTraits?.location?.id || '');
  }, [pathOptions]);

  const coordFiles = pinnedNodes.filter(n => isUnderPath(n.id, PATHS.COORDINATES_XYZ));

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
        Assign Location (X Y Z)
      </Typography>
      <FormControl size="small" fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select X Y Z Coordinate</InputLabel>
        <Select
          value={selectedCoordTraitId}
          onChange={(e) => {
            setSelectedCoordTraitId(e.target.value);
            const selected = coordFiles.find(f => f.id === e.target.value);
            if (selected) {
              const rd = selected.attributes?.nodeDefinition || {};
              onUpdate({
                assignedTraits: {
                  ...(pathOptions.assignedTraits || {}),
                  location: {
                    name: selected.name ?? 'Unnamed',
                    id: selected.id,
                    x: rd.x ?? '0',
                    y: rd.y ?? '0',
                    z: rd.z ?? '0',
                  },
                },
              });
            }
          }}
          label="Select X Y Z Coordinate"
        >
          {coordFiles.length > 0 ? (
            coordFiles.map((file) => {
              const rd = file.attributes?.nodeDefinition || {};
              return (
                <MenuItem key={file.id} value={file.id}>
                  {file.name ?? 'Unnamed'} → X:{rd.x ?? 0}, Y:{rd.y ?? 0}, Z:{rd.z ?? 0}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem disabled>No coordinates defined</MenuItem>
          )}
        </Select>
      </FormControl>

      {pathOptions.assignedTraits?.location && (
        <Chip
          label={`Location: X:${pathOptions.assignedTraits.location.x ?? 0}, Y:${pathOptions.assignedTraits.location.y ?? 0}, Z:${pathOptions.assignedTraits.location.z ?? 0}`}
          color="secondary"
          size="small"
        />
      )}
    </Box>
  );
}