'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

type Props = { pathOptions: any; onUpdate?: (data: any) => void };

export default function XYZ_2_1_5_2_1({ pathOptions, onUpdate }: Props) {
  const [x, setX] = useState(pathOptions.nodeDefinition?.x || '');
  const [y, setY] = useState(pathOptions.nodeDefinition?.y || '');
  const [z, setZ] = useState(pathOptions.nodeDefinition?.z || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      const updated = {
        x: x.trim() || '0',
        y: y.trim() || '0',
        z: z.trim() || '0',
      };
      if (
        updated.x !== (pathOptions.nodeDefinition?.x || '0') ||
        updated.y !== (pathOptions.nodeDefinition?.y || '0') ||
        updated.z !== (pathOptions.nodeDefinition?.z || '0')
      ) {
        onUpdate?.({ nodeDefinition: updated });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [x, y, z, pathOptions.nodeDefinition, onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>Define Coordinates (as Text)</Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField label="X" size="small" value={x} onChange={(e) => setX(e.target.value)} placeholder="0" sx={{ width: 100 }} />
        <TextField label="Y" size="small" value={y} onChange={(e) => setY(e.target.value)} placeholder="0" sx={{ width: 100 }} />
        <TextField label="Z" size="small" value={z} onChange={(e) => setZ(e.target.value)} placeholder="0" sx={{ width: 100 }} />
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
        All values stored as text
      </Typography>
    </Box>
  );
}