'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

type Props = {
  pathOptions: any;
  onUpdate?: (data: any) => void;
};

export default function Angle_2_5_1_7({ pathOptions, onUpdate }: Props) {
  const currentValue = pathOptions.nodeDefinition?.degrees || '';

  const [degrees, setDegrees] = useState(currentValue);

  // Debounced update
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = degrees.trim();
      if (trimmed !== currentValue) {
        if (trimmed && !isNaN(Number(trimmed)) && Number(trimmed) >= 0 && Number(trimmed) <= 360) {
          onUpdate?.({
            nodeDefinition: { degrees: trimmed },
          });
        } else if (trimmed === '') {
          onUpdate?.({ nodeDefinition: {} });
        }
        // Invalid values (outside 0-360 or non-numeric) are ignored until corrected
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [degrees, currentValue, onUpdate]);

  const handleChange = (value: string) => {
    // Allow empty or valid numeric input only
    if (value === '' || (/^\d*\.?\d*$/.test(value) && Number(value) <= 360)) {
      setDegrees(value);
    }
  };

  const isValid = degrees === '' || (!isNaN(Number(degrees)) && Number(degrees) >= 0 && Number(degrees) <= 360);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Angle
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter an angle in degrees (0 to 360).
      </Typography>

      <TextField
        size="small"
        label="Degrees"
        value={degrees}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="e.g. 45"
        variant="outlined"
        type="text"
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*\\.?[0-9]*',
          maxLength: 6, // Plenty for 360.000
        }}
        helperText={!isValid && degrees !== '' ? 'Must be a number between 0 and 360' : '0° – 360°'}
        error={!isValid && degrees !== ''}
        sx={{ width: 240 }}
      />
    </Box>
  );
}