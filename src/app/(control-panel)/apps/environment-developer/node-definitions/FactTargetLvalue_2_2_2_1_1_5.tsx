'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

type Props = {
  pathOptions: any;
  onUpdate?: (data: any) => void;
};

export default function FactTargetLvalue_2_2_2_1_1_5({ pathOptions, onUpdate }: Props) {
  const currentValue = pathOptions.nodeDefinition?.targetLvalue || '';

  const [targetLvalue, setTargetLvalue] = useState(currentValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (targetLvalue !== currentValue) {
        onUpdate?.({
          nodeDefinition: { targetLvalue: targetLvalue.trim() || '' },
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [targetLvalue, currentValue, onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Fact Target L-Value
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter any text or number to define the target L-value.
      </Typography>

      <TextField
        fullWidth
        size="small"
        label="Target L-Value"
        value={targetLvalue}
        onChange={(e) => setTargetLvalue(e.target.value)}
        placeholder="Enter text or number"
      />
    </Box>
  );
}