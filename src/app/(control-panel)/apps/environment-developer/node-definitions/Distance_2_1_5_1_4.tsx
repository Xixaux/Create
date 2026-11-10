'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

type Props = {
  pathOptions: any;
  onUpdate?: (data: any) => void;
};

export default function Distance_2_1_5_1_4({ pathOptions, onUpdate }: Props) {
  const currentDef = pathOptions.nodeDefinition || {};

  const hasValue = currentDef.value !== undefined;
  const initialValue = hasValue ? String(currentDef.value) : '';

  const [value, setValue] = useState(initialValue);

  // Debounced update
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = value.trim();

      if (trimmed && !isNaN(Number(trimmed)) && Number(trimmed) >= 0) {
        onUpdate?.({ nodeDefinition: { value: trimmed } });
      } else if (trimmed === '') {
        onUpdate?.({ nodeDefinition: {} });
      }
      // If invalid input, we don't send an update (keeps previous valid state)
    }, 400);

    return () => clearTimeout(timer);
  }, [value, onUpdate]);

  const handleNumericChange = (input: string) => {
    // Allow empty string, digits, and one decimal point
    if (input === '' || /^\d*\.?\d*$/.test(input)) {
      setValue(input);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Distance
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter a positive numeric distance value.
      </Typography>

      <TextField
        fullWidth
        size="small"
        label="Distance Value"
        value={value}
        onChange={(e) => handleNumericChange(e.target.value)}
        placeholder="e.g. 10.5"
        variant="outlined"
        type="text"
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*\\.?[0-9]*',
        }}
        helperText="Positive number (decimals allowed)"
        sx={{ maxWidth: 300 }}
      />
    </Box>
  );
}