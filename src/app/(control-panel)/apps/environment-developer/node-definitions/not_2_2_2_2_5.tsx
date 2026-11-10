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

export default function Not_2_2_2_2_5({ onUpdate }: Props) {
  useEffect(() => {
    onUpdate?.({
      nodeDefinition: {
        operator: 'not',
      },
    });
  }, [onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Logic Operator: NOT
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        This node applies the logical NOT operation.
        <br />
        Inverts the truth value: true becomes false, false becomes true.
      </Typography>

      <FormControl fullWidth size="small" disabled>
        <InputLabel>Operator</InputLabel>
        <Select value="not" label="Operator">
          <MenuItem value="not">Apply NOT Operator</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}