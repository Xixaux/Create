'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

type Props = { pathOptions: any; onUpdate?: (data: any) => void };

export default function Variable_2_4({ pathOptions, onUpdate }: Props) {
  const [varName, setVarName] = useState(pathOptions.nodeDefinition?.name || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = varName.trim();
      if (trimmed !== (pathOptions.nodeDefinition?.name || '') && onUpdate) {
        onUpdate({ nodeDefinition: { name: trimmed || null } });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [varName, pathOptions.nodeDefinition?.name, onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>Variable Name</Typography>
      <TextField
        placeholder="e.g. health, score, playerName"
        size="small"
        fullWidth
        value={varName}
        onChange={(e) => setVarName(e.target.value)}
        helperText="Stored as nodeDefinition.name"
        inputProps={{ style: { fontFamily: 'monospace' } }}
      />
    </Box>
  );
}