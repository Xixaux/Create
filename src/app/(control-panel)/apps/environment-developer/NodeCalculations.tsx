'use client';

import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import FunctionsIcon from '@mui/icons-material/Functions';

interface NodeCalculationsProps {
  parentFolderId: string;
  onCalculationDetected: (data: { isCalculationNode: true; calculationName: string }) => void;
}

export default function NodeCalculations({ parentFolderId, onCalculationDetected }: NodeCalculationsProps) {
  const prevId = useRef<string>('');

  const isCalculationNode = parentFolderId.startsWith('2.1.1.1.1');

  useEffect(() => {
    if (isCalculationNode && parentFolderId !== prevId.current) {
      const calculationName = parentFolderId.split('.').pop() || 'Calculation';

      onCalculationDetected({ isCalculationNode: true, calculationName });

      window.dispatchEvent(new CustomEvent('attachNodeAttributes') as any); // simplified, same effect

      prevId.current = parentFolderId;
    }

    if (!isCalculationNode && prevId.current !== '') {
      prevId.current = '';
    }
  }, [parentFolderId, isCalculationNode, onCalculationDetected]);

  if (!isCalculationNode) return null;

  return (
    <Box
      sx={{
        mt: 2,
        mb: 1,
        py: 1,
        px: 2,
        bgcolor: 'rgba(3, 138, 255, 0.06)',
        borderLeft: '3px solid #4fc3f7',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        fontSize: '0.82rem',
      }}
    >
      <FunctionsIcon sx={{ fontSize: 18, color: '#4fc3f7', opacity: 0.8 }} />
      <Box>
        <Typography variant="caption" sx={{ color: '#0d47a1', fontWeight: 600, lineHeight: 1 }}>
          Calculation operator
        </Typography>
        <Typography variant="caption" sx={{ color: '#546e7a', ml: 0.5 }}>
          (items here become + − × ÷ nodes)
        </Typography>
      </Box>
    </Box>
  );
}