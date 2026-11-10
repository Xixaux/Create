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

export default function TargetLvalue_2_2_2_1_1_3({ pathOptions, onUpdate }: Props) {
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
        Target L-Value
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Define the name of the target (left-value) for assignment or mutation.
        <br />
        Examples: <code>player_health</code>, <code>score_total</code>, <code>temperature_C</code>
      </Typography>

      <TextField
        fullWidth
        size="small"
        label="Target Name"
        placeholder="e.g. player_health"
        value={valueName}
        onChange={(e) => setValueName(e.target.value)}
        helperText="This will be the variable/value being modified or assigned"
        sx={{ maxWidth: 400 }}
      />
    </Box>
  );
}