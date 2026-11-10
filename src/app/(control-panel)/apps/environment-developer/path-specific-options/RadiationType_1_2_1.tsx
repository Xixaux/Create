'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type Props = {
  currentNodeId: string;
  onUpdate: (data: any) => void;
  pathOptions?: Record<string, any>;
};

export default function RadiationType_1_2_1({ currentNodeId, onUpdate, pathOptions = {} }: Props) {
  if (currentNodeId !== '1.2.1') return null;

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
        Apply Radiation Type
      </Typography>
      <FormControl size="small" fullWidth sx={{ mb: 2 }}>
        <InputLabel>Type</InputLabel>
        <Select
          defaultValue=""
          onChange={(e) =>
            onUpdate({
              assignedTraits: {
                ...(pathOptions.assignedTraits || {}),
                radiationType: {
                  name: `Radiation: ${e.target.value}`,
                  value: e.target.value,
                  id: `radiation_${Date.now()}`,
                },
              },
            })
          }
          label="Type"
        >
          <MenuItem value="electromagnetic">Electromagnetic</MenuItem>
          <MenuItem value="thermal">Thermal</MenuItem>
          <MenuItem value="acoustic">Acoustic</MenuItem>
          <MenuItem value="particle">Particle</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}