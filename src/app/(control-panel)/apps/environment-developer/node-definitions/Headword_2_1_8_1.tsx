'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

type Props = {
  pathOptions: any;
  onUpdate?: (data: any) => void;
};

export default function Headword_2_1_8_1({ pathOptions, onUpdate }: Props) {
  const currentValue = pathOptions.nodeDefinition?.text || '';

  const [text, setText] = useState(currentValue);

  // Debounced update
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = text.trim();
      if (trimmed !== currentValue) {
        if (trimmed) {
          onUpdate?.({
            nodeDefinition: {
              text: trimmed,
            },
          });
        } else {
          onUpdate?.({ nodeDefinition: {} });
        }
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [text, currentValue, onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 500 }}>
        Headword
      </Typography>

      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
        Enter a single word for dictionary meaning (e.g. "Mango", "Beranderberry", "Swimming")
      </Typography>

      <TextField
        size="small"
        label="Headword"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="e.g. Apple"
        variant="outlined"
        sx={{
          maxWidth: 300, // Prevents stretching across the full container
          width: '100%',
        }}
        inputProps={{
          autoComplete: 'off',
        }}
      />
    </Box>
  );
}