'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

type Props = { pathOptions: any; onUpdate?: (data: any) => void };

export default function Spectrum_2_1_4({ pathOptions, onUpdate }: Props) {
  const [high, setHigh] = useState(pathOptions.nodeDefinition?.highValue || '');
  const [low, setLow] = useState(pathOptions.nodeDefinition?.lowValue || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (high !== (pathOptions.nodeDefinition?.highValue || '') || low !== (pathOptions.nodeDefinition?.lowValue || '')) {
        onUpdate?.({
          nodeDefinition: {
            highValue: high.trim() || null,
            lowValue: low.trim() || null,
          },
        });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [high, low, pathOptions.nodeDefinition, onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>Define Spectrum Range (as Text)</Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField label="High Value" size="small" value={high} onChange={(e) => setHigh(e.target.value)} placeholder="e.g. 1000, Red, Max" sx={{ flex: 1 }} />
        <TextField label="Low Value" size="small" value={low} onChange={(e) => setLow(e.target.value)} placeholder="e.g. 0, Blue, Min" sx={{ flex: 1 }} />
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
        Both values stored as text strings
      </Typography>
    </Box>
  );
}