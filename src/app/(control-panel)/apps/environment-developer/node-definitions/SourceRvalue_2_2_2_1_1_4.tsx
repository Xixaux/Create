'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

type Props = {
  pathOptions: any;
  onUpdate?: (data: any) => void;
  createdThings?: any[];
};

export default function SourceRvalue_2_2_2_1_1_4({ pathOptions, onUpdate }: Props) {
  const currentDef = pathOptions.nodeDefinition || {};
  const [valueName, setValueName] = useState(currentDef.valueName || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (valueName.trim()) {
        onUpdate?.({
          nodeDefinition: { valueName: valueName.trim() },
        });
      } else {
        onUpdate?.({ nodeDefinition: {} });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [valueName, onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Source R-Value
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Define the name of the source (right-value) used in an expression or assignment.
        <br />
        Examples: <code>damage_amount</code>, <code>bonus_points</code>, <code>input_reading</code>
      </Typography>

      <TextField
        fullWidth
        size="small"
        label="Source Name"
        placeholder="e.g. damage_amount"
        value={valueName}
        onChange={(e) => setValueName(e.target.value)}
        helperText="This will be the value being read or used in the operation"
        sx={{ maxWidth: 400 }}
      />
    </Box>
  );
}