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

export default function ElseIf_2_2_2_2_7({ onUpdate }: Props) {
  useEffect(() => {
    onUpdate?.({
      nodeDefinition: {
        operator: 'elseif',
      },
    });
  }, [onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Logic Control: ELSE IF
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Checks an additional condition after a previous "if" or "elseif" failed.
        <br />
        Allows multiple conditional branches.
      </Typography>

      <FormControl fullWidth size="small" disabled>
        <InputLabel>Control Flow</InputLabel>
        <Select value="elseif" label="Control Flow">
          <MenuItem value="elseif">Apply ELSE IF</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}