'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

type Props = {
  pathOptions: any;
  onUpdate?: (data: any) => void;
};

export default function Size_2_1_2_2({ pathOptions, onUpdate }: Props) {
  const currentDef = pathOptions.nodeDefinition || {};

  const [long, setLong] = useState(currentDef.long || '');
  const [wide, setWide] = useState(currentDef.wide || '');
  const [tall, setTall] = useState(currentDef.tall || '');

  // Debounced update
  useEffect(() => {
    const timer = setTimeout(() => {
      const update: any = {};

      if (long.trim()) update.long = long.trim();
      if (wide.trim()) update.wide = wide.trim();
      if (tall.trim()) update.tall = tall.trim();

      const hasData = Object.keys(update).length > 0;

      if (hasData) {
        onUpdate?.({ nodeDefinition: update });
      } else {
        onUpdate?.({ nodeDefinition: {} });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [long, wide, tall, onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Define Size
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter dimensions. Use "Tall" only when defining three-dimensional size.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          size="small"
          label="Long (Length)"
          value={long}
          onChange={(e) => setLong(e.target.value)}
          placeholder="e.g. 150"
          variant="outlined"
          type="text"
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
            maxLength: 12, // Reasonable limit (e.g. up to trillions)
          }}
          sx={{ width: 220 }} // Short, compact field
        />

        <TextField
          size="small"
          label="Wide (Width)"
          value={wide}
          onChange={(e) => setWide(e.target.value)}
          placeholder="e.g. 80"
          variant="outlined"
          type="text"
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
            maxLength: 12,
          }}
          sx={{ width: 220 }}
        />

        <TextField
          size="small"
          label="Tall (Height) — Optional (3D only)"
          value={tall}
          onChange={(e) => setTall(e.target.value)}
          placeholder="e.g. 200"
          variant="outlined"
          type="text"
          helperText="Leave blank for 2D size"
          FormHelperTextProps={{ sx: { fontSize: '0.75rem', color: 'text.secondary' } }}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
            maxLength: 12,
          }}
          sx={{ width: 220 }}
        />
      </Box>
    </Box>
  );
}