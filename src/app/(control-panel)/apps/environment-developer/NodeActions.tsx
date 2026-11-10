'use client';

import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';

interface NodeActionsProps {
  parentFolderId: string;
  onActionDetected: (data: { isActionNode: true; actionName: string }) => void;
}

/**
 * =============================================================================
 * TODO NOTE FOR FUTURE DEVELOPMENT:
 *
 * This directory (environment-developer\node-actions) is the designated place
 * to define and implement the **actual executable actions** (Move, Create,
 * Destroy, Add, Remove, Loop, etc.) when that phase of the system is ready.
 *
 * The node hierarchy files for all actions have already been created in the
 * main tree under 2_1_9_Action and its children. This component currently only
 * detects entry into that subtree and signals the rest of the app — it does NOT
 * execute any actions yet.
 *
 * When implementing real behavior:
 *   • Map the detected `actionName` (or full node ID) to concrete logic here
 *     or in imported action modules.
 *   • Use the dispatched `attachNodeAttributes` event or `onActionDetected`
 *     callback to trigger runtime execution.
 * =============================================================================
 */

export default function NodeActions({ parentFolderId, onActionDetected }: NodeActionsProps) {
  const prevId = useRef<string>('');

  // Matches 2.1.9 and any child (Move, Create, Destroy, etc.)
  const isActionNode = /^2\.1\.9(\.\d+)*$/.test(parentFolderId);

  useEffect(() => {
    if (isActionNode && parentFolderId !== prevId.current) {
      const actionName = parentFolderId.split('.').pop() || 'Action';

      onActionDetected({
        isActionNode: true,
        actionName,
      });

      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('attachNodeAttributes', {
            detail: {
              nodeactions: {
                isActionNode: true,
                actionName,
                detectedAt: new Date().toISOString(),
              },
            },
          })
        );
      }

      prevId.current = parentFolderId;
    }

    if (!isActionNode && prevId.current !== '') {
      prevId.current = '';
    }
  }, [parentFolderId, isActionNode, onActionDetected]);

  if (!isActionNode) return null;

  return (
    <Box
      sx={{
        mt: 2,
        mb: 1,
        py: 1,
        px: 2,
        bgcolor: 'rgba(147, 51, 234, 0.06)',      // soft purple tint
        borderLeft: '3px solid #ab47bc',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        fontSize: '0.82rem',
      }}
    >
      <BoltIcon sx={{ fontSize: 18, color: '#ab47bc', opacity: 0.85 }} />
      <Box>
        <Typography variant="caption" sx={{ color: '#6a1b9a', fontWeight: 600, lineHeight: 1 }}>
          Action operator
        </Typography>
        <Typography variant="caption" sx={{ color: '#546e7a', ml: 0.5 }}>
          (items here become Move, Create, Destroy, etc.)
        </Typography>
      </Box>
    </Box>
  );
}