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

export default function RightOperand_2_2_2_1_1_2({ pathOptions, onUpdate }: Props) {
  const currentDef = pathOptions.nodeDefinition || {};
  const [operandName, setOperandName] = useState(currentDef.operandName || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (operandName.trim()) {
        onUpdate?.({
          nodeDefinition: { operandName: operandName.trim() },
        });
      } else {
        onUpdate?.({ nodeDefinition: {} });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [operandName, onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Right Operand
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Define the name of the right operand in an expression or comparison.
        <br />
        Examples: <code>basket</code>, <code>target_value</code>, <code>max_temperature</code>
      </Typography>

      <TextField
        fullWidth
        size="small"
        label="Operand Name"
        placeholder="e.g. basket"
        value={operandName}
        onChange={(e) => setOperandName(e.target.value)}
        helperText="This name will be used as the right side of operations"
        sx={{ maxWidth: 400 }}
      />
    </Box>
  );
}