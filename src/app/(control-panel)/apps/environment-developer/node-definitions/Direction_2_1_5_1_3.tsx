'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';

type DirectionOption = {
  label: string;
  value: string; // stored as degrees string
  short: string;
};

const directions: DirectionOption[] = [
  { label: 'North', value: '0', short: 'N' },
  { label: 'Northeast', value: '45', short: 'NE' },
  { label: 'East', value: '90', short: 'E' },
  { label: 'Southeast', value: '135', short: 'SE' },
  { label: 'South', value: '180', short: 'S' },
  { label: 'Southwest', value: '225', short: 'SW' },
  { label: 'West', value: '270', short: 'W' },
  { label: 'Northwest', value: '315', short: 'NW' },
];

type Props = {
  pathOptions: any;
  onUpdate?: (data: any) => void;
};

export default function Direction_2_1_5_1_3({ pathOptions, onUpdate }: Props) {
  const currentValue = pathOptions.nodeDefinition?.degrees || '';

  const [selected, setSelected] = useState(currentValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (selected !== currentValue) {
        if (selected) {
          onUpdate?.({
            nodeDefinition: { degrees: selected },
          });
        } else {
          onUpdate?.({ nodeDefinition: {} });
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [selected, currentValue, onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Direction
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Select a cardinal or intercardinal direction (in degrees).
      </Typography>

      <FormControl component="fieldset">
        <RadioGroup
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          name="direction-radio-group"
        >
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
            {directions.map((dir) => (
              <FormControlLabel
                key={dir.value}
                value={dir.value}
                control={<Radio size="small" />}
                label={
                  <Typography variant="body2">
                    <strong>{dir.label}</strong> ({dir.short}): {dir.value}°
                  </Typography>
                }
                sx={{ marginRight: 4 }}
              />
            ))}
          </Box>
        </RadioGroup>
      </FormControl>
    </Box>
  );
}