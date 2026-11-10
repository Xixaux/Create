'use client';

import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type Props = {
  pathOptions: any;
  onUpdate?: (data: any) => void;
  createdThings?: any[];
};

export default function GreaterThan_2_1_1_1_1_16({ onUpdate }: Props) {
  useEffect(() => {
    onUpdate?.({
      nodeDefinition: {
        operator: '>',
      },
    });
  }, [onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Comparison Operator: Greater Than
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Returns true if the left operand is strictly greater than the right operand.
      </Typography>

      <FormControl fullWidth size="small" disabled>
        <InputLabel>Operator</InputLabel>
        <Select value=">" label="Operator">
          <MenuItem value=">">Apply Greater Than ( &gt; )</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}