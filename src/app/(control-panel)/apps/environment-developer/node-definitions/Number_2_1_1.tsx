'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

type Props = { pathOptions: any; onUpdate?: (data: any) => void };

export default function Number_2_1_1({ pathOptions, onUpdate }: Props) {
  const [value, setValue] = useState(pathOptions.nodeDefinition?.value || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = value.trim();
      if (trimmed !== (pathOptions.nodeDefinition?.value || '') && onUpdate) {
        onUpdate({ nodeDefinition: { value: trimmed || null } });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [value, pathOptions.nodeDefinition?.value, onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>Define Number (as Text)</Typography>
      <TextField
        label="Number"
        type="text"
        size="small"
        fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="e.g. 7, 007, Se7en"
        helperText="Stored as text"
      />
    </Box>
  );
}