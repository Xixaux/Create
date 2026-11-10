'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type Props = { pathOptions: any; onUpdate?: (data: any) => void };

export default function Equal_2_1_1_1_1_14({ onUpdate }: Props) {
  const symbol = '=';
  React.useEffect(() => onUpdate?.({ nodeDefinition: { symbol } }), [onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>Equality Operator</Typography>
      <FormControl size="small" fullWidth>
        <InputLabel>Symbol</InputLabel>
        <Select value={symbol} disabled label="Symbol">
          <MenuItem value={symbol}>
            <Box sx={{ fontFamily: 'monospace', fontSize: '1.5rem', fontWeight: 500 }}>{symbol}</Box>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}