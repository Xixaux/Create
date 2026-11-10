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

export default function Else_2_2_2_2_6({ onUpdate }: Props) {
  useEffect(() => {
    onUpdate?.({
      nodeDefinition: {
        operator: 'else',
      },
    });
  }, [onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Logic Control: ELSE
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        This node executes when the preceding "if" or "elseif" condition is false.
        <br />
        Used in conditional branching.
      </Typography>

      <FormControl fullWidth size="small" disabled>
        <InputLabel>Control Flow</InputLabel>
        <Select value="else" label="Control Flow">
          <MenuItem value="else">Apply ELSE</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}