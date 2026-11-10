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

export default function Or_2_2_2_2_3({ onUpdate }: Props) {
  // Immediately apply the fixed definition on mount
  useEffect(() => {
    onUpdate?.({
      nodeDefinition: {
        operator: 'or',
      },
    });
  }, [onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Logic Operator: OR
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Applies the logical OR operation.
      </Typography>

      {/* Visual confirmation dropdown – disabled since it's fixed */}
      <FormControl fullWidth size="small" disabled>
        <InputLabel>Operator</InputLabel>
        <Select value="or" label="Operator">
          <MenuItem value="or">Apply OR Operator</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}