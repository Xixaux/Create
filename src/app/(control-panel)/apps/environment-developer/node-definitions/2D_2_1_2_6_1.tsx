'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';

type Props = {
  pathOptions: any;
  onUpdate?: (data: any) => void;
  createdThings?: Array<{ id: string; name: string; parentFolderId: string }>;
};

const VALUE_PATH = '2.5';
const VARIABLE_PATH = '2.4';

export default function TwoD_2_1_2_6_1({ pathOptions, onUpdate, createdThings = [] }: Props) {
  const currentDef = pathOptions.nodeDefinition || {};

  // Initialize state from existing nodeDefinition or empty
  const [grid, setGrid] = useState<string[]>(() => {
    return Array(9)
      .fill('')
      .map((_, i) => currentDef[`cell${i + 1}`] || '');
  });

  // Filter only Values (2.5) and Variables (2.4)
  const options = createdThings.filter(
    (thing) =>
      thing.parentFolderId === VALUE_PATH || thing.parentFolderId === VARIABLE_PATH
  );

  // Debounced update to parent
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasChanges = grid.some((val, i) => val !== (currentDef[`cell${i + 1}`] || ''));

      if (hasChanges && grid.some((val) => val !== '')) {
        const update: Record<string, string> = {};
        grid.forEach((value, i) => {
          if (value) update[`cell${i + 1}`] = value;
        });

        onUpdate?.({
          nodeDefinition: {
            type: '2D_grid',
            rows: 3,
            cols: 3,
            ...update,
          },
        });
      } else if (grid.every((val) => val === '')) {
        // Clear if all empty
        onUpdate?.({ nodeDefinition: {} });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [grid, currentDef, onUpdate]);

  const handleChange = (index: number, value: string) => {
    setGrid((prev) => {
      const newGrid = [...prev];
      newGrid[index] = value;
      return newGrid;
    });
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Define 3×3 Two-Dimensional Grid
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Assign a Value or Variable to each cell. Cells represent positions in a 3×3 2D array.
      </Typography>

      <Grid container spacing={2} sx={{ maxWidth: 600 }}>
        {[0, 1, 2].map((row) => (
          <Grid item xs={12} key={row}>
            <Grid container spacing={2}>
              {[0, 1, 2].map((col) => {
                const index = row * 3 + col;
                const value = grid[index];

                return (
                  <Grid item xs={4} key={index}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Cell {index + 1}</InputLabel>
                      <Select
                        value={value}
                        label={`Cell ${index + 1}`}
                        onChange={(e) => handleChange(index, e.target.value as string)}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {options.map((opt) => (
                          <MenuItem key={opt.id} value={opt.id}>
                            {opt.name || 'Unnamed'} ({opt.parentFolderId === VALUE_PATH ? 'Value' : 'Variable'})
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        ))}
      </Grid>

      {options.length === 0 && (
        <Typography variant="caption" color="warning.main" sx={{ mt: 2, display: 'block' }}>
          No Values (2.5) or Variables (2.4) have been created yet.
        </Typography>
      )}
    </Box>
  );
}