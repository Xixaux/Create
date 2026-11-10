'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircularProgress from '@mui/material/CircularProgress';

interface PathSpecificControlsProps {
  currentNodeId: string;
  onUpdate?: (data: any) => void;
  value?: string;
}

export default function PathSpecificControls({
  currentNodeId,
  onUpdate,
  value = '',
}: PathSpecificControlsProps) {
  const [isApplied, setIsApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleApply = async () => {
    if (!onUpdate) return;
    setIsLoading(true);
    setIsApplied(false);
    try {
      // Small delay to simulate async work and give feedback
      await new Promise((resolve) => setTimeout(resolve, 300));
      onUpdate({ [currentNodeId]: value || 'applied' });
      setIsApplied(true);
    } catch (err) {
      console.error('Assign failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        my: 2,
        p: 1.8,
        borderRadius: '8px',
        bgcolor: 'rgba(255, 255, 255, 0.6)',
        border: '1px solid rgba(0, 164, 239, 0.15)',
        display: 'flex',
        gap: 1.5,
        flexWrap: 'wrap',
        alignItems: 'center',
        fontSize: '0.82rem',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontWeight: 600,
          color: '#1a1a1a',
          minWidth: 160,
          opacity: 0.8,
        }}
      >
        Controls • {currentNodeId}
      </Typography>

      <Button
        variant="outlined"
        size="small"
        onClick={handleApply}
        disabled={isLoading || isApplied}
        startIcon={
          isLoading ? <CircularProgress size={14} /> : isApplied ? <CheckCircleIcon fontSize="small" /> : null
        }
        sx={{
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.78rem',
          py: 0.6,
          px: 2,
          minWidth: 124,
          color: isApplied ? '#00A4EF' : '#333',
          borderColor: isApplied ? '#00A4EF' : '#ccc',
          bgcolor: isApplied ? 'rgba(0, 164, 239, 0.07)' : '#fff',
          '&:hover': {
            borderColor: '#00A4EF',
            bgcolor: 'rgba(0, 164, 239, 0.08)',
          },
          '&:disabled': {
            opacity: 0.6,
          },
        }}
      >
        {isLoading ? 'Assigning…' : isApplied ? 'Assigned' : 'Assign Node-Specific Option'}
      </Button>

      {isApplied && (
        <Typography
          variant="caption"
          sx={{
            ml: 'auto',
            color: '#00A4EF',
            fontWeight: 500,
            fontSize: '0.72rem',
          }}
        >
          Trait Applied
        </Typography>
      )}
    </Box>
  );
}