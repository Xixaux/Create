'use client';

import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

type Props = { pathOptions: any; onUpdate?: (data: any) => void };

// Use this exact code for BOTH files
const CubeData = {
  Cube: {
    structure: [[[[true, true], [true, true]], [[true, true], [true, true]]]],
    type: 'voxel',
    size: '2x2x2',
    solid: true,
  },
  Hexomino: {
    structure: [[[true, true, true], [true, false, false]], [[true, false, false], [true, false, false]]],
    type: 'voxel',
    size: '3x2x2',
    solid: false,
  },
};

export default function Cube_2_1_2_6_2_4({ onUpdate }: Props) {
  const data = CubeData.Cube;
  const title = '2×2×2 Solid Cube';
  const readyText = '2×2×2 solid cube ready';

  useEffect(() => {
    onUpdate?.({
      nodeDefinition: {
        materialStructure: JSON.stringify(data.structure),
        structureType: data.type,
        size: data.size,
        solid: data.solid,
        appliedAt: new Date().toISOString(),
      },
    });
  }, [onUpdate]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500, color: 'info.main' }}>
        {title} (Auto-Applied)
      </Typography>
      <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1, border: '1px dashed grey', fontFamily: 'monospace', fontSize: '0.8rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0 }}>{JSON.stringify(data.structure, null, 2)}</pre>
      </Box>
      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <CheckCircleOutlineIcon fontSize="small" color="success" />
        <Typography variant="body2" color="success.main" sx={{ fontWeight: 500 }}>
          {readyText}
        </Typography>
      </Box>
    </Box>
  );
}