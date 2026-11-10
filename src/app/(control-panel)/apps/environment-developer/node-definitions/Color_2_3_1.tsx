'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

type Props = { pathOptions: any; onUpdate?: (data: any) => void };

export default function Color_2_3_1({ pathOptions, onUpdate }: Props) {
  const [name, setName] = useState(pathOptions.nodeDefinition?.name || '');
  const [hex, setHex] = useState(pathOptions.nodeDefinition?.hex || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (name !== (pathOptions.nodeDefinition?.name || '') || hex !== (pathOptions.nodeDefinition?.hex || '')) {
        onUpdate?.({ nodeDefinition: { name: name.trim() || null, hex: hex.trim() || null } });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [name, hex, pathOptions.nodeDefinition, onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>Define Color</Typography>
      <TextField
        label="Color Name"
        size="small"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Crimson Red"
        sx={{ mb: 1 }}
      />
      <TextField
        label="Hex Code"
        size="small"
        fullWidth
        value={hex}
        onChange={(e) => setHex(e.target.value)}
        placeholder="#FF0000"
      />
    </Box>
  );
}