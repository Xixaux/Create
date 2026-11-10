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

export default function Add_2_1_9_5({ onUpdate }: Props) {
  // Immediately apply the fixed nodeDefinition when this component mounts
  useEffect(() => {
    onUpdate?.({
      nodeDefinition: {
        action: 'add',
      },
    });
  }, [onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Action: Add
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        This node represents the "Add" action. No additional configuration is required.
        <br />
        It will combine or append compatible inputs when connected.
      </Typography>

      {/* Disabled dropdown just for visual confirmation */}
      <FormControl fullWidth size="small" disabled>
        <InputLabel>Action Type</InputLabel>
        <Select value="add" label="Action Type">
          <MenuItem value="add">Add</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}