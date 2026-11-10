'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface PinnedNode { id: string; name: string }

type Props = {
  pathOptions: any;
  onUpdate?: (data: any) => void;
  createdThings?: PinnedNode[];
};

export default function Associate_2_1_8({ pathOptions, onUpdate, createdThings = [] }: Props) {
  const [fromId, setFromId] = useState<string>(pathOptions.nodeDefinition?.associateFrom || '');
  const [toId, setToId] = useState<string>(pathOptions.nodeDefinition?.associateTo || '');

  const available = useMemo(
    () => createdThings.filter(t => t.id.startsWith('created_')).sort((a, b) => a.name.localeCompare(b.name)),
    [createdThings]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (fromId !== (pathOptions.nodeDefinition?.associateFrom || '') || toId !== (pathOptions.nodeDefinition?.associateTo || '')) {
        onUpdate?.({
          nodeDefinition: {
            associateFrom: fromId || null,
            associateTo: toId || null,
          },
        });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [fromId, toId, pathOptions.nodeDefinition, onUpdate]);

  return (
    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 500, color: 'warning.main' }}>
        Associate
      </Typography>

      <FormControl size="small" fullWidth>
        <InputLabel>Associate From</InputLabel>
        <Select value={fromId} onChange={(e) => setFromId(e.target.value)} label="Associate From">
          <MenuItem value=""><em>None</em></MenuItem>
          {available.map(t => (
            <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" fullWidth>
        <InputLabel>Associate To</InputLabel>
        <Select value={toId} onChange={(e) => setToId(e.target.value)} label="Associate To">
          <MenuItem value=""><em>None</em></MenuItem>
          {available.map(t => (
            <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}