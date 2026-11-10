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

export default function While_2_2_2_2_8({ onUpdate }: Props) {
  useEffect(() => {
    onUpdate?.({
      nodeDefinition: {
        operator: 'while',
      },
    });
  }, [onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Loop Control: WHILE
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Repeats connected actions as long as the condition remains true.
        <br />
        Creates a loop that checks the condition before each iteration.
      </Typography>

      <FormControl fullWidth size="small" disabled>
        <InputLabel>Loop Type</InputLabel>
        <Select value="while" label="Loop Type">
          <MenuItem value="while">Apply WHILE Loop</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}