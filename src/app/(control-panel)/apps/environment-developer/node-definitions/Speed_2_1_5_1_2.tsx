'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

type Props = {
  pathOptions: any;
  onUpdate?: (data: any) => void;
};

export default function Speed_2_1_5_1_2({ pathOptions, onUpdate }: Props) {
  const currentValue = pathOptions.nodeDefinition?.value || '';

  const [value, setValue] = useState(currentValue);

  // Debounced update
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = value.trim();
      if (trimmed !== currentValue) {
        if (trimmed && !isNaN(Number(trimmed)) && Number(trimmed) >= 0) {
          onUpdate?.({
            nodeDefinition: { value: trimmed },
          });
        } else if (trimmed === '') {
          onUpdate?.({ nodeDefinition: {} });
        }
        // Invalid (negative or non-numeric) values are ignored until fixed
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [value, currentValue, onUpdate]);

  const handleChange = (input: string) => {
    // Allow empty, digits, and one decimal point
    if (input === '' || /^\d*\.?\d*$/.test(input)) {
      setValue(input);
    }
  };

  const isValid = value === '' || (!isNaN(Number(value)) && Number(value) >= 0);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Speed
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter speed as a positive number (decimals allowed).
      </Typography>

      <TextField
        size="small"
        label="Speed Value"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="e.g. 299792458"
        variant="outlined"
        type="text" // Keeps it as string
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*\\.?[0-9]*',
        }}
        helperText={!isValid && value !== '' ? 'Must be a positive number' : 'Any positive value (e.g. m/s, km/h)'}
        error={!isValid && value !== ''}
        sx={{ width: 300 }}
      />
    </Box>
  );
}