'use client';

import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type Props = { pathOptions: any; onUpdate?: (data: any) => void };

export default function Flip_2_1_9_24({ onUpdate }: Props) {
  useEffect(() => {
    onUpdate?.({ nodeDefinition: { operation: 'flip' } });
  }, [onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500, color: 'warning.main' }}>
        Operation: Flip
      </Typography>
      <FormControl size="small" fullWidth>
        <InputLabel>Operation</InputLabel>
        <Select value="flip" disabled label="Operation">
          <MenuItem value="flip">Flip</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}