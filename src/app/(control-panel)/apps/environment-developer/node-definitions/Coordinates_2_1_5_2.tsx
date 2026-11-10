'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type Props = {
  pathOptions: any;
  onUpdate?: (data: any) => void;
  createdThings?: Array<{ id: string; name: string; parentFolderId: string }>;
};

const VALUE_PATH = '2.5';
const VARIABLE_PATH = '2.4';

export default function Coordinates_2_1_5_2({
  pathOptions,
  onUpdate,
  createdThings = [],
}: Props) {
  const currentDef = pathOptions.nodeDefinition || {};

  const [mode, setMode] = useState<'2d' | '3d'>(currentDef.zId !== undefined ? '3d' : '2d');

  const [xId, setXId] = useState(currentDef.xId || '');
  const [yId, setYId] = useState(currentDef.yId || '');
  const [zId, setZId] = useState(currentDef.zId || '');

  const options = createdThings.filter(
    (thing) =>
      thing.parentFolderId === VALUE_PATH || thing.parentFolderId === VARIABLE_PATH
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const update: any = {
        type: mode === '3d' ? 'coordinates_3d' : 'coordinates_2d',
        xId,
        yId,
      };

      if (mode === '3d') {
        update.zId = zId;
      }

      const hasData = xId || yId || (mode === '3d' && zId);

      if (hasData) {
        onUpdate?.({ nodeDefinition: update });
      } else {
        onUpdate?.({ nodeDefinition: {} });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [xId, yId, zId, mode, onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Define Coordinates
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Choose 2D (X Y) or 3D (X Y Z) and assign a Value or Variable to each axis.
      </Typography>

      <FormControl fullWidth size="small" sx={{ mb: 3 }}>
        <InputLabel>Coordinate System</InputLabel>
        <Select value={mode} label="Coordinate System" onChange={(e) => setMode(e.target.value as '2d' | '3d')}>
          <MenuItem value="2d">2D (X Y)</MenuItem>
          <MenuItem value="3d">3D (X Y Z)</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 500 }}>
        <FormControl fullWidth size="small">
          <InputLabel>Axis X</InputLabel>
          <Select value={xId} label="Axis X" onChange={(e) => setXId(e.target.value as string)}>
            <MenuItem value=""><em>None</em></MenuItem>
            {options.map((opt) => (
              <MenuItem key={opt.id} value={opt.id}>
                {opt.name || 'Unnamed'} ({opt.parentFolderId === VALUE_PATH ? 'Value' : 'Variable'})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Axis Y</InputLabel>
          <Select value={yId} label="Axis Y" onChange={(e) => setYId(e.target.value as string)}>
            <MenuItem value=""><em>None</em></MenuItem>
            {options.map((opt) => (
              <MenuItem key={opt.id} value={opt.id}>
                {opt.name || 'Unnamed'} ({opt.parentFolderId === VALUE_PATH ? 'Value' : 'Variable'})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {mode === '3d' && (
          <FormControl fullWidth size="small">
            <InputLabel>Axis Z</InputLabel>
            <Select value={zId} label="Axis Z" onChange={(e) => setZId(e.target.value as string)}>
              <MenuItem value=""><em>None</em></MenuItem>
              {options.map((opt) => (
                <MenuItem key={opt.id} value={opt.id}>
                  {opt.name || 'Unnamed'} ({opt.parentFolderId === VALUE_PATH ? 'Value' : 'Variable'})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>

      {options.length === 0 && (
        <Typography variant="caption" color="warning.main" sx={{ mt: 3, display: 'block' }}>
          No Values (2.5) or Variables (2.4) have been created yet.
        </Typography>
      )}
    </Box>
  );
}