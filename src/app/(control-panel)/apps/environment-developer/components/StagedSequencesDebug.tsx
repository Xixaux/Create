'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface SequenceDetector {
  id: string;
  name: string;
  description?: string;
  badgeLabel: string;
  requiredFolderIds: string[];
}

interface StagedSequencesDebugProps {
  stagedSequences: any[][] | undefined;
  hasStaged: boolean;
  hasSpecialSequence: boolean;
  activeDetector: SequenceDetector | null;
  onClear: () => void;
}

export default function StagedSequencesDebug({
  stagedSequences,
  hasStaged,
  hasSpecialSequence,
  activeDetector,
  onClear,
}: StagedSequencesDebugProps) {
  return (
    <Box
      sx={{
        flex: '1 1 0%',
        minWidth: 250,
        borderRadius: '12px',
        bgcolor: '#0d1117',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #30363d',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        fontFamily: '"Fira Code", monospace',
        fontSize: '0.85rem',
        color: '#c9d1d9',
        maxHeight: '600px',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1" sx={{ color: '#58a6ff', fontWeight: 500, fontSize: '1rem' }}>
          Staged Sequences Debug
          {hasStaged && stagedSequences && (
            <span style={{ marginLeft: 8, fontSize: '0.85rem', opacity: 0.8 }}>
              ({stagedSequences.length} sequence{stagedSequences.length !== 1 ? 's' : ''})
            </span>
          )}
        </Typography>
        {hasStaged && (
          <Button
            size="small"
            onClick={onClear}
            sx={{ color: '#ff6b6b', fontSize: '0.75rem', minWidth: 'auto', '&:hover': { bgcolor: 'rgba(255,107,107,0.1)' } }}
          >
            Clear
          </Button>
        )}
      </Box>

      {!hasStaged || !stagedSequences || stagedSequences.length === 0 ? (
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b949e', fontStyle: 'italic' }}>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Stage a sequence or chain to see debug output here
          </Typography>
        </Box>
      ) : (
        <Box sx={{ flex: 1, overflowY: 'auto', pr: 1 }}>
          {/* Dynamic Special Banner */}
 

          {/* Sequence list */}
          {stagedSequences.map((sequence, seqIndex) => {
            // FIX: This replaces the broken 'const const [viewMode...]' line
            const isSpecial = seqIndex === 0 && hasSpecialSequence;

            return (
              <Box
                key={seqIndex}
                sx={{
                  mb: 2.5,
                  p: 2.5,
                  bgcolor: '#161b22',
                  borderRadius: '8px',
                  border: isSpecial ? '2px solid #00ff9d' : '1px solid #30363d',
                  boxShadow: isSpecial ? '0 0 10px rgba(0, 255, 157, 0.25)' : 'none',
                }}
              >
                <Typography sx={{ color: isSpecial ? '#00ff9d' : '#79c0ff', fontWeight: 600, mb: 1.5, fontSize: '0.9rem' }}>
                  Sequence #{seqIndex + 1} ({sequence.length} nodes)
                  {isSpecial && activeDetector && (
                    <>
                      {}
                      <span style={{
                        marginLeft: '10px',
                        padding: '3px 9px',
                        backgroundColor: '#00ff9d33',
                        border: '1px solid #00ff9d',
                        borderRadius: '6px',
                        color: '#00ff9d',
                        fontWeight: 500,
                        fontSize: '0.80rem'
                      }}>
                        {activeDetector.badgeLabel}
                      </span>
                    </>
                  )}
                </Typography>
                <Box sx={{ pl: 2 }}>
  {sequence.map((node: any, nodeIndex: number) => {
    const nodeDef = node.attributes?.nodeDefinition;

    return (
      <Box key={nodeIndex} sx={{ mb: 1.8 }}>
        <div><strong>ID:</strong> <span style={{ color: '#79c0ff' }}>{node.id || '—'}</span></div>
        <div><strong>Folder:</strong> <span style={{ color: '#a0d8ef' }}>{node.parentFolderId || '—'}</span></div>

        {/* Display nodeDefinition attributes if they exist */}
        {nodeDef && Object.keys(nodeDef).length > 0 && (
          <Box sx={{ mt: 1.2, pl: 2, borderLeft: '2px solid #ffab70', opacity: 0.9 }}>
            <div><strong style={{ color: '#ffab70', fontSize: '0.85em' }}>Definition:</strong></div>
            {Object.entries(nodeDef).map(([key, value]) => (
              <div key={key} style={{ margin: '4px 0 4px 12px', fontSize: '0.82em' }}>
                <strong>{key}:</strong>{' '}
                <span style={{ color: '#c3e88d', fontFamily: '"Fira Code", monospace' }}>
                  {String(value)}
                </span>
              </div>
            ))}
          </Box>
        )}
      </Box>
    );
  })}
</Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}