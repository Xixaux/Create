'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

type Props = { pathOptions: any; onUpdate?: (data: any) => void };

export default function Value_2_5({ pathOptions, onUpdate }: Props) {
  const [value, setValue] = useState<string>(pathOptions.nodeDefinition?.value || '');

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
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
        Enter Literal Value
      </Typography>
      <TextField
        placeholder='e.g. 42, "hello", true, #FF0000, player1'
        size="small"
        fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText="Stored exactly as text in nodeDefinition.value"
        inputProps={{ style: { fontFamily: 'monospace' } }}
      />
    </Box>
  );
}