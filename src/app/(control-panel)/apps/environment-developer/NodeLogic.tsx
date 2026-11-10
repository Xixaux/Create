'use client';

import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

interface NodeLogicProps {
  parentFolderId: string;
  onLogicDetected: (data: { isLogicNode: true; logicName: string }) => void;
}

export default function NodeLogic({ parentFolderId, onLogicDetected }: NodeLogicProps) {
  const prevId = useRef<string>('');

  // Matches 2.2.2.2 and any deeper children (if, while, loop, etc.)
  const isLogicNode = /^2\.2\.2\.2(\.\d+)*$/.test(parentFolderId);

  useEffect(() => {
    if (isLogicNode && parentFolderId !== prevId.current) {
      const logicName = parentFolderId.split('.').pop() || 'Logic';

      onLogicDetected({
        isLogicNode: true,
        logicName,
      });

      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('attachNodeAttributes', {
            detail: {
              nodelogic: {
                isLogicNode: true,
                logicName,
                detectedAt: new Date().toISOString(),
              },
            },
          })
        );
      }

      prevId.current = parentFolderId;
    }

    // Reset when leaving a logic folder
    if (!isLogicNode && prevId.current !== '') {
      prevId.current = '';
    }
  }, [parentFolderId, isLogicNode, onLogicDetected]);

  if (!isLogicNode) return null;

  return (
    <Box
      sx={{
        mt: 2,
        mb: 1,
        py: 1,
        px: 2,
        bgcolor: 'rgba(46, 125, 50, 0.06)',        // soft green tint
        borderLeft: '3px solid #66bb6a',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        fontSize: '0.82rem',
      }}
    >
      <AccountTreeIcon sx={{ fontSize: 18, color: '#66bb6a', opacity: 0.85 }} />
      <Box>
        <Typography variant="caption" sx={{ color: '#1b5e20', fontWeight: 600, lineHeight: 1 }}>
          Logic flow operator
        </Typography>
        <Typography variant="caption" sx={{ color: '#546e7a', ml: 0.5 }}>
          (items here become if, while, loop, etc.)
        </Typography>
      </Box>
    </Box>
  );
}