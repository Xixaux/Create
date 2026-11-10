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

export default function Nand_2_2_2_2_9({ onUpdate }: Props) {
  useEffect(() => {
    onUpdate?.({
      nodeDefinition: {
        operator: 'nand',
      },
    });
  }, [onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Logic Operator: NAND
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        This node applies the NOT AND (NAND) operation.
        <br />
        Returns false only if all inputs are true; otherwise true.
      </Typography>

      <FormControl fullWidth size="small" disabled>
        <InputLabel>Operator</InputLabel>
        <Select value="nand" label="Operator">
          <MenuItem value="nand">Apply NAND Operator</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}