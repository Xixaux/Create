'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type Props = { pathOptions: any; onUpdate?: (data: any) => void };

const shades = [
  { name: 'Navy', hex: '#001F3F' },
  { name: 'Blue', hex: '#0074D9' },
  { name: 'Aqua', hex: '#7FDBFF' },
  { name: 'Teal', hex: '#39CCCC' },
  { name: 'Royal', hex: '#4169E1' },
  { name: 'Sky', hex: '#87CEEB' },
  { name: 'Steel', hex: '#4682B4' },
  { name: 'Midnight', hex: '#191970' },
];

export default function BlueColor_2_3_1_5({ pathOptions, onUpdate }: Props) {
  const [selected, setSelected] = useState(pathOptions.nodeDefinition?.hex || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (selected && selected !== (pathOptions.nodeDefinition?.hex || '')) {
        const shade = shades.find(s => s.hex === selected);
        if (shade) onUpdate?.({ nodeDefinition: { name: shade.name, hex: shade.hex } });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [selected, pathOptions.nodeDefinition, onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>Select Blue Shade</Typography>
      <FormControl size="small" fullWidth>
        <InputLabel>Shade</InputLabel>
        <Select value={selected} onChange={(e) => setSelected(e.target.value)} label="Shade">
          {shades.map(s => (
            <MenuItem key={s.hex} value={s.hex}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 16, height: 16, bgcolor: s.hex, borderRadius: 1, border: '1px solid #ccc' }} />
                {s.name} ({s.hex})
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}