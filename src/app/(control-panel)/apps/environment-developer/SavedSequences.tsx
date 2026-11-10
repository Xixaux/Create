'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface SequenceItem {
  type: 'node';
  id: string;
  name: string;
  fullPath: string;
  parentFolderId: string;
  categoryLabel: string;
  roleLabel: string;
  displayLabel: string;
  attributes?: Record<string, any>;
  customName?: string;
}

interface SavedBehaviorSet {
  id: string;
  label: string;
  inputCount: number;
  outputCount: number;
  chain: Array<{
    label: string;
    inputs: SequenceItem[][];
    outputs: SequenceItem[][];
  }>;
}

interface SavedSequencesProps {
  quickSavedSequences: SequenceItem[][];
  onLoadSequence: (sequence: SequenceItem[]) => void;
  onDeleteSequence: (index: number, name: string) => void;

  savedBehaviorSets: SavedBehaviorSet[];
  onLoadBehaviorSet: (set: SavedBehaviorSet) => void;
  onDeleteBehaviorSet: (id: string) => void;
}

export default function SavedSequences({
  quickSavedSequences,
  onLoadSequence,
  onDeleteSequence,
  savedBehaviorSets,
  onLoadBehaviorSet,
  onDeleteBehaviorSet,
}: SavedSequencesProps) {
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleImport = () => {
    alert('Import Sequence - functionality coming soon!');
    handleMenuClose();
  };

  const handleExport = () => {
    alert('Export Sequence - functionality coming soon!');
    handleMenuClose();
  };

  return (
    <Box
      sx={{
        flex: 1,
        bgcolor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        p: 3,
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        height: '400px',
      }}
    >
      {/* Header with title and 3-dot menu */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 500, color: '#333' }}>
          Saved Sequences & Behavior Sets
        </Typography>
        <IconButton size="small" onClick={handleMenuOpen} sx={{ color: '#666' }}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* 3-dot menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        slotProps={{
          paper: {
            sx: {
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              mt: 0.5,
            },
          },
        }}
      >
        <MenuItem onClick={handleImport}>Import Sequence</MenuItem>
        <MenuItem onClick={handleExport}>Export Sequence</MenuItem>
      </Menu>

      <Box sx={{ flex: 1, overflowY: 'auto', bgcolor: '#f9f9f9', borderRadius: '8px', p: 1 }}>
        {/* Quick Saved Sequences */}
        {quickSavedSequences.length > 0 && (
          <>
            <Typography variant="caption" sx={{ px: 1, color: '#666', fontWeight: 500, display: 'block', mb: 0.5 }}>
              Sequences
            </Typography>
            <List disablePadding dense>
              {quickSavedSequences.map((seq, idx) => {
                const sequenceName =
                  seq[0]?.customName ||
                  seq.map((s) => s.name).join(' → ') ||
                  `Sequence #${idx + 1}`;

                return (
                  <ListItemButton
                    key={idx}
                    onClick={() => onLoadSequence([...seq])}
                    sx={{
                      borderRadius: '6px',
                      mb: 0.5,
                      '&:hover': { bgcolor: '#e3f2fd' },
                    }}
                  >
                    <ListItemText
                      primary={`#${idx + 1} ${sequenceName}`}
                      primaryTypographyProps={{
                        fontFamily: 'monospace',
                        fontSize: '0.82rem',
                      }}
                    />
                    <IconButton
                      size="small"
                      edge="end"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSequence(idx, sequenceName);
                      }}
                      sx={{ color: '#d32f2f' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </ListItemButton>
                );
              })}
            </List>
          </>
        )}

        {/* Saved Behavior Sets */}
        {savedBehaviorSets.length > 0 && (
          <>
            {quickSavedSequences.length > 0 && <Divider sx={{ my: 1.5 }} />}
            <Typography variant="caption" sx={{ px: 1, color: '#1976d2', fontWeight: 500, display: 'block', mb: 0.5 }}>
              Behavior Sets (Input → Output)
            </Typography>
            <List disablePadding dense>
              {savedBehaviorSets.map((set) => (
                <ListItemButton
                  key={set.id}
                  onClick={() => onLoadBehaviorSet(set)}
                  sx={{
                    borderRadius: '8px',
                    mb: 0.8,
                    bgcolor: '#e3f2fd',
                    border: '1px solid #bbdefb',
                    '&:hover': { bgcolor: '#bbdefb' },
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography component="span" variant="body2" sx={{ fontWeight: 600 }}>
                          {set.label}
                        </Typography>
                        <Chip
                          label={`${set.inputCount} in → ${set.outputCount} out`}
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ height: 22, fontSize: '0.7rem' }}
                        />
                      </Box>
                    }
                  />
                  <IconButton
                    size="small"
                    edge="end"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteBehaviorSet(set.id);
                    }}
                    sx={{ color: '#d32f2f' }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ListItemButton>
              ))}
            </List>
          </>
        )}

        {/* Empty State */}
        {quickSavedSequences.length === 0 && savedBehaviorSets.length === 0 && (
          <Typography
            color="text.secondary"
            sx={{ fontStyle: 'italic', textAlign: 'center', py: 6 }}
          >
            No saved sequences or behavior sets yet
          </Typography>
        )}
      </Box>
    </Box>
  );
}