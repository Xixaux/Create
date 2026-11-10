'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type Props = {
  pathOptions: any;
  onUpdate?: (data: any) => void;
};

export default function TestNode_9.9.9({ pathOptions, onUpdate }: Props) {
  // TODO: Add custom UI for TestNode node
  // Example: dropdowns, inputs, sliders, etc.
  // Use onUpdate to send data back to CreateNewNode

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
        Configure TestNode
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Custom configuration for TestNode node (folder ID: 9.9.9).
        <br />
        Implement your UI here.
      </Typography>
    </Box>
  );
}
