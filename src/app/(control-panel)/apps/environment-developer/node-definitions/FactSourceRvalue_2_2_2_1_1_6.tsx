'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

type Props = {
  pathOptions: any;
  onUpdate?: (data: any) => void;
};

export default function FactSourceRvalue_2_2_2_1_1_6({ pathOptions, onUpdate }: Props) {
  const currentValue = pathOptions.nodeDefinition?.sourceRvalue || '';

  const [sourceRvalue, setSourceRvalue] = useState(currentValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (sourceRvalue !== currentValue) {
        onUpdate?.({
          nodeDefinition: { sourceRvalue: sourceRvalue.trim() || '' },
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [sourceRvalue, currentValue, onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Fact Source R-Value
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter any text or number to define the source R-value.
      </Typography>

      <TextField
        fullWidth
        size="small"
        label="Source R-Value"
        value={sourceRvalue}
        onChange={(e) => setSourceRvalue(e.target.value)}
        placeholder="Enter text or number"
      />
    </Box>
  );
}