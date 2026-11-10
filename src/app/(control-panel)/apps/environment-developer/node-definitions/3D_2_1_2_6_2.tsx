'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

type Props = {
  pathOptions: any;
  onUpdate?: (data: any) => void;
  createdThings?: Array<{ id: string; name: string; parentFolderId: string }>;
};

const VALUE_PATH = '2.5';
const VARIABLE_PATH = '2.4';
const LAYERS = ['Front (Layer 0)', 'Middle (Layer 1)', 'Back (Layer 2)'];

export default function ThreeD_2_1_2_6_2({ pathOptions, onUpdate, createdThings = [] }: Props) {
  const currentDef = pathOptions.nodeDefinition || {};

  // Initialize 27-cell state (3x3x3 = 27)
  const [grid, setGrid] = useState<string[]>(() => {
    return Array(27)
      .fill('')
      .map((_, i) => currentDef[`cell${i + 1}`] || '');
  });

  // Filter available Values and Variables
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
            type: '3D_grid',
            depth: 3,
            rows: 3,
            cols: 3,
            ...update,
          },
        });
      } else if (grid.every((val) => val === '')) {
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

  // Helper to get cell index: layer * 9 + row * 3 + col
  const getCellIndex = (layer: number, row: number, col: number) => layer * 9 + row * 3 + col;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Define 3×3×3 Three-Dimensional Grid
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Assign a Value or Variable to each of the 27 cells across three layers.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 700 }}>
        {LAYERS.map((layerName, layerIndex) => (
          <Paper key={layerIndex} elevation={3} sx={{ p: 3, bgcolor: 'background.default' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
              {layerName}
            </Typography>

            <Grid container spacing={2}>
              {[0, 1, 2].map((row) => (
                <Grid item xs={12} key={row}>
                  <Grid container spacing={2}>
                    {[0, 1, 2].map((col) => {
                      const index = getCellIndex(layerIndex, row, col);
                      const value = grid[index];
                      const cellNumber = index + 1;

                      return (
                        <Grid item xs={4} key={index}>
                          <FormControl fullWidth size="small">
                            <InputLabel>Cell {cellNumber}</InputLabel>
                            <Select
                              value={value}
                              label={`Cell ${cellNumber}`}
                              onChange={(e) => handleChange(index, e.target.value as string)}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {options.map((opt) => (
                                <MenuItem key={opt.id} value={opt.id}>
                                  {opt.name || 'Unnamed'} (
                                  {opt.parentFolderId === VALUE_PATH ? 'Value' : 'Variable'})
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
          </Paper>
        ))}
      </Box>

      {options.length === 0 && (
        <Typography variant="caption" color="warning.main" sx={{ mt: 3, display: 'block' }}>
          No Values (2.5) or Variables (2.4) have been created yet.
        </Typography>
      )}
    </Box>
  );
}