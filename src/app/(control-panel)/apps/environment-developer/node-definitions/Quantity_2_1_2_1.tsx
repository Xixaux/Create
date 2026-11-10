'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

type Props = {
  pathOptions: any;
  onUpdate?: (data: any) => void;
};

export default function Quantity_2_1_2_1({ pathOptions, onUpdate }: Props) {
  const currentValue = pathOptions.nodeDefinition?.value || '';

  const [value, setValue] = useState(currentValue);

  // Debounced update
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = value.replace(/^0+/, '') || '0'; // Remove leading zeros, but keep '0' if empty
      if (trimmed !== currentValue) {
        if (trimmed !== '0') {
          onUpdate?.({
            nodeDefinition: { value: trimmed },
          });
        } else {
          onUpdate?.({ nodeDefinition: {} });
        }
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [value, currentValue, onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Quantity
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter a positive integer. The maximum value is a 999 centillion (999×10<sup>303</sup>).
      </Typography>

      <TextField
        size="small"
        label="Quantity"
        value={value}
        onChange={(e) => {
          const input = e.target.value;
          // Allow only digits (no decimals, negatives, or letters)
          if (/^\d*$/.test(input)) {
            setValue(input);
          }
        }}
        placeholder="e.g. 42"
        variant="outlined"
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*',
          maxLength: 306, // 3 digits (999) + 303 zeros = 306 characters max
        }}
        helperText="Up to 306 digits allowed (max: 999 centillion)"
        FormHelperTextProps={{
          sx: { fontSize: '0.75rem', color: 'text.secondary' },
        }}
        sx={{ width: 300 }}
      />
    </Box>
  );
}