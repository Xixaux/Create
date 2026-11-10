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

export default function Xor_2_2_2_2_4({ onUpdate }: Props) {
  useEffect(() => {
    onUpdate?.({
      nodeDefinition: {
        operator: 'xor',
      },
    });
  }, [onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Logic Operator: XOR
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        This node applies the exclusive OR (XOR) operation.
        <br />
        Returns true only if exactly one input is true.
      </Typography>

      <FormControl fullWidth size="small" disabled>
        <InputLabel>Operator</InputLabel>
        <Select value="xor" label="Operator">
          <MenuItem value="xor">Apply XOR Operator</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}