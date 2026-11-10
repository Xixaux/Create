'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type Props = { pathOptions: any; onUpdate?: (data: any) => void };

export default function Then_2_2_2_8({ onUpdate }: Props) {
  const word = 'Then';
  React.useEffect(() => onUpdate?.({ nodeDefinition: { word } }), [onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500, color: 'success.main' }}>
        Conditional: Then
      </Typography>
      <FormControl size="small" fullWidth>
        <InputLabel>Keyword</InputLabel>
        <Select value={word} disabled label="Keyword">
          <MenuItem value={word}>
            <Box sx={{ fontFamily: 'monospace', fontWeight: 700, color: 'success.main' }}>{word}</Box>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}