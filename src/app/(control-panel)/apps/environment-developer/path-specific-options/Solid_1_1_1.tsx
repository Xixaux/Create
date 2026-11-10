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
  COLOR: '2.3.1',
  COORDINATES_XYZ: '2.1.5.2.1',
  SHAPES_3D: '2.1.2.6.2',
} as const;

const isUnderPath = (nodeId: string, basePath: string): boolean => {
  if (!nodeId?.startsWith('created_')) return false;
  const match = nodeId.match(/^created_(?:\d+_)*(.+)$/);
  if (!match) return false;
  const path = match[1];
  return path === basePath || path.startsWith(basePath + '.');
};

export default function Solid_1_1_1({ currentNodeId, onUpdate, pinnedNodes = [], pathOptions = {} }: Props) {
  const [selectedColorTraitId, setSelectedColorTraitId] = useState<string>('');
  const [selectedCoordTraitId, setSelectedCoordTraitId] = useState<string>('');
  const [selectedShapeTraitId, setSelectedShapeTraitId] = useState<string>('');

  useEffect(() => {
    const traits = pathOptions?.assignedTraits || {};
    setSelectedColorTraitId(traits.color?.id || '');
    setSelectedCoordTraitId(traits.location?.id || '');
    setSelectedShapeTraitId(traits.shape?.id || '');
  }, [pathOptions]);

  const colorFiles = pinnedNodes.filter(n => isUnderPath(n.id, PATHS.COLOR));
  const coordFiles = pinnedNodes.filter(n => isUnderPath(n.id, PATHS.COORDINATES_XYZ));
  const shapeFiles = pinnedNodes.filter(n => isUnderPath(n.id, PATHS.SHAPES_3D));

  const isSolidPath = currentNodeId === '1.1.1' || currentNodeId.startsWith('1.1.1.');

  if (!isSolidPath) return null;

  return (
    <Box>
      {/* Color */}
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>Apply Color</Typography>
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
                  color: { name: selected.name, id: selected.id },
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

      {/* Location */}
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>Assign Location (X Y Z)</Typography>
      <FormControl size="small" fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select X Y Z Coordinate</InputLabel>
        <Select
          value={selectedCoordTraitId}
          onChange={(e) => {
            setSelectedCoordTraitId(e.target.value);
            const selected = coordFiles.find(f => f.id === e.target.value);
            if (selected) {
              onUpdate({
                assignedTraits: {
                  ...(pathOptions.assignedTraits || {}),
                  location: {
                    name: selected.name ?? 'Unnamed',
                    id: selected.id,
                    x: selected.attributes?.nodeDefinition?.x ?? '0',
                    y: selected.attributes?.nodeDefinition?.y ?? '0',
                    z: selected.attributes?.nodeDefinition?.z ?? '0',
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

      {/* Shape */}
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500, mt: 2 }}>Assign Shape</Typography>
      <FormControl size="small" fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select 3D Shape</InputLabel>
        <Select
          value={selectedShapeTraitId}
          onChange={(e) => {
            setSelectedShapeTraitId(e.target.value);
            const selected = shapeFiles.find(f => f.id === e.target.value);
            if (selected) {
              onUpdate({
                assignedTraits: {
                  ...(pathOptions.assignedTraits || {}),
                  shape: {
                    name: selected.name ?? 'Unnamed',
                    id: selected.id,
                    type: selected.attributes?.nodeDefinition?.structureType === 'voxel' ? 'voxel' : 'shape',
                    size: selected.attributes?.nodeDefinition?.size ?? 'unknown',
                    ...(selected.attributes?.nodeDefinition || {}),
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
              return (
                <MenuItem key={file.id} value={file.id}>
                  {file.name ?? 'Unnamed'} ({path}) — {rd.size ?? ''} {rd.size && '·'} {type}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem disabled>No 3D shapes defined</MenuItem>
          )}
        </Select>
      </FormControl>

      {/* Chips */}
      <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {pathOptions.assignedTraits?.color && (
          <Chip label={`Color: ${pathOptions.assignedTraits.color.name ?? 'Unknown'}`} color="primary" size="small" />
        )}
        {pathOptions.assignedTraits?.location && (
          <Chip
            label={`Location: X:${pathOptions.assignedTraits.location.x ?? 0}, Y:${pathOptions.assignedTraits.location.y ?? 0}, Z:${pathOptions.assignedTraits.location.z ?? 0}`}
            color="secondary"
            size="small"
          />
        )}
        {pathOptions.assignedTraits?.shape && (
          <Chip
            label={`Shape: ${pathOptions.assignedTraits.shape.name ?? 'Unknown'} (${pathOptions.assignedTraits.shape.size || 'Custom'})`}
            color="info"
            size="small"
            variant="outlined"
          />
        )}
      </Box>
    </Box>
  );
}