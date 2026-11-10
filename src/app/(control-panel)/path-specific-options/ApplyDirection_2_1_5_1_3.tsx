'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type Props = {
  pathOptions: any;
  onUpdate?: (data: any) => void;
};

export default function ApplyDirection_2_1_5_1_3({ pathOptions, onUpdate }: Props) {
  const currentValue = pathOptions.nodeDefinition?.apply || false;

  const [apply, setApply] = useState(currentValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (apply !== currentValue) {
        onUpdate?.({
          nodeDefinition: { apply: apply },
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [apply, currentValue, onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Apply Direction
      </Typography>

      <FormControl fullWidth size="small">
        <InputLabel>Apply Direction</InputLabel>
        <Select
          value={apply ? 'yes' : 'no'}
          label="Apply Direction"
          onChange={(e) => setApply(e.target.value === 'yes')}
        >
          <MenuItem value="no">No</MenuItem>
          <MenuItem value="yes">Yes</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
