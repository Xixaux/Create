'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

type Props = {
  pathOptions: any;
  onUpdate?: (data: any) => void;
};

export default function Definition_2_1_8_2({ pathOptions, onUpdate }: Props) {
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
    }, 500); // Slightly longer debounce for longer text

    return () => clearTimeout(timer);
  }, [text, currentValue, onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 500 }}>
        Definition
      </Typography>

      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
        Provide a clear definition or description (multi-line supported).
      </Typography>

      <TextField
        multiline
        minRows={4}
        maxRows={10}
        fullWidth
        size="small"
        label="Definition Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="e.g. A fruit that grows on trees and is typically red or green..."
        variant="outlined"
        sx={{
          '& .MuiInputBase-root': {
            fontSize: '0.875rem',
          },
        }}
      />
    </Box>
  );
}