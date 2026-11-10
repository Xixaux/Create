'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Chip from '@mui/material/Chip';

type Props = { pathOptions: any; onUpdate?: (data: any) => void };

export default function Progression_2_1_7({ pathOptions, onUpdate }: Props) {
  const initial = Array.isArray(pathOptions.nodeDefinition?.progressionSteps) ? pathOptions.nodeDefinition.progressionSteps : [];
  const [steps, setSteps] = useState<string[]>(initial.length > 0 ? initial : ['']);

  const addStep = () => setSteps(prev => [...prev, '']);
  const updateStep = (i: number, v: string) => setSteps(prev => prev.map((s, idx) => (idx === i ? v : s)));
  const removeStep = (i: number) => setSteps(prev => prev.filter((_, idx) => idx !== i));

  useEffect(() => {
    const timer = setTimeout(() => {
      const cleaned = steps.filter(s => s.trim().length > 0);
      const current = Array.isArray(pathOptions.nodeDefinition?.progressionSteps)
        ? pathOptions.nodeDefinition.progressionSteps.filter((s: string) => s.trim().length > 0)
        : [];
      if (JSON.stringify(cleaned) !== JSON.stringify(current)) {
        onUpdate?.({ nodeDefinition: { progressionSteps: cleaned.length > 0 ? cleaned : null } });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [steps, pathOptions.nodeDefinition?.progressionSteps, onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500, color: 'success.main' }}>
        Add Progression Increment
      </Typography>
      {steps.map((step, i) => (
        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <TextField
            size="small"
            value={step}
            onChange={(e) => updateStep(i, e.target.value)}
            placeholder={`Step ${i + 1} (e.g. Winter, 0%, White)`}
            sx={{ flex: 1 }}
          />
          {steps.length > 1 && (
            <IconButton size="small" onClick={() => removeStep(i)} color="error">
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      ))}
      <Button startIcon={<AddCircleOutlineIcon />} onClick={addStep} size="small" variant="outlined" sx={{ mt: 1 }}>
        Add Step
      </Button>
      {steps.filter(s => s.trim()).length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary">Current chain:</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
            {steps.filter(s => s.trim()).map((s, i) => (
              <Chip key={i} label={`${i + 1}. ${s}`} size="small" color="success" variant="outlined" />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}