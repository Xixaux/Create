'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

type Props = {
  currentNodeId: string;
  onUpdate: (data: any) => void;
  pathOptions?: Record<string, any>;
};

export default function Direction_2_1_5_1_3({ currentNodeId, onUpdate, pathOptions = {} }: Props) {
  if (currentNodeId !== '2.1.5.1.3') return null;

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
        Apply Direction
      </Typography>
      <TextField
        label="Degrees"
        type="text"
        size="small"
        fullWidth
        defaultValue={pathOptions.assignedTraits?.direction?.value || ''}
        onChange={(e) =>
          onUpdate({
            assignedTraits: {
              ...(pathOptions.assignedTraits || {}),
              direction: {
                name: `Direction: ${e.target.value}°`,
                value: e.target.value,
                id: `dir_${Date.now()}`,
              },
            },
          })
        }
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        sx={{ mb: 2 }}
      />
    </Box>
  );
}