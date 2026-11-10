'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type Props = {
  pathOptions: any;
  onUpdate?: (data: any) => void;
};

type Mode = 'qualitative' | 'specific';

export default function Duration_2_1_5_1_5({ pathOptions, onUpdate }: Props) {
  const currentDef = pathOptions.nodeDefinition || {};

  const hasQualifier = currentDef.qualifier !== undefined;
  const hasValue = currentDef.value !== undefined;

  const initialMode: Mode = hasQualifier ? 'qualitative' : hasValue ? 'specific' : 'specific';

  const [mode, setMode] = useState<Mode>(initialMode);
  const [qualifier, setQualifier] = useState(currentDef.qualifier || '');
  const [value, setValue] = useState(currentDef.value || '');

  // Debounced update
  useEffect(() => {
    const timer = setTimeout(() => {
      let update: any = {};

      if (mode === 'qualitative' && qualifier) {
        update.qualifier = qualifier;
      } else if (mode === 'specific') {
        const trimmed = value.trim();
        if (trimmed && !isNaN(Number(trimmed)) && Number(trimmed) >= 0) {
          update.value = trimmed;
        }
      }

      const hasData = Object.keys(update).length > 0;

      if (hasData) {
        onUpdate?.({ nodeDefinition: update });
      } else {
        onUpdate?.({ nodeDefinition: {} });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [mode, qualifier, value, onUpdate]);

  const handleNumericChange = (input: string) => {
    if (input === '' || /^\d*\.?\d*$/.test(input)) {
      setValue(input);
    }
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    // Clear the other field when switching
    if (newMode === 'qualitative') {
      setValue('');
    } else {
      setQualifier('');
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Duration
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Choose either a qualitative description or a specific numeric value.
      </Typography>

      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <RadioGroup
          row
          value={mode}
          onChange={(e) => handleModeChange(e.target.value as Mode)}
        >
          <FormControlLabel
            value="qualitative"
            control={<Radio size="small" />}
            label="Short / Long"
          />
          <FormControlLabel
            value="specific"
            control={<Radio size="small" />}
            label="Specific Value"
          />
        </RadioGroup>
      </FormControl>

      {mode === 'qualitative' ? (
        <FormControl fullWidth size="small">
          <InputLabel>Duration</InputLabel>
          <Select
            value={qualifier}
            label="Duration"
            onChange={(e) => setQualifier(e.target.value as string)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="short">Short</MenuItem>
            <MenuItem value="long">Long</MenuItem>
          </Select>
        </FormControl>
      ) : (
        <TextField
          fullWidth
          size="small"
          label="Duration Value"
          value={value}
          onChange={(e) => handleNumericChange(e.target.value)}
          placeholder="e.g. 5.2"
          variant="outlined"
          type="text"
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*\\.?[0-9]*',
          }}
          helperText="Positive number (decimals allowed)"
          sx={{ maxWidth: 300 }}
        />
      )}
    </Box>
  );
}