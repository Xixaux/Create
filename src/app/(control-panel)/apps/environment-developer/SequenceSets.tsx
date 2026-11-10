'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';
import StagedSequencesDebug from './components/StagedSequencesDebug';
import { SEQUENCE_PROCESSORS, SequenceProcessor } from './sequence-detection/sequenceProcessing';

/**
 * ===================================================================
 * CRITICAL FIX: PRESERVING SEQUENCE BOUNDARIES (NO FLATTENING PER SET)
 * ===================================================================
 * ... (your excellent comment preserved unchanged)
 * ===================================================================
 */

interface SavedSet {
  id: string;
  inputs: any[][];
  outputs: any[][];
  label: string;
}

interface SavedBehaviorSet {
  id: string;
  label: string;
  inputCount: number;
  outputCount: number;
  chain: Array<{
    label: string;
    inputs: any[][];
    outputs: any[][];
  }>;
}

interface SequenceSetsProps {
  inputSequences: any[][];
  outputSequences: any[][];
  onRemoveInput: (index: number) => void;
  onRemoveOutput: (index: number) => void;
  onStageChain: (sets: SavedSet[]) => void;
  isExecuting?: boolean;
  onClearStaging?: () => void;
  savedBehaviorSets: SavedBehaviorSet[];
  onSaveBehaviorSet: (set: SavedBehaviorSet) => void;
  loadedChain: SavedSet[] | null;
  onLoadedChainComplete: () => void;
  onStagedSequencesChange?: (sequences: any[][]) => void;
}

declare global {
  interface Window {
    __stagedSequencesForDebug?: any[][];
  }
}

export default function SequenceSets({
  inputSequences,
  outputSequences,
  onRemoveInput,
  onRemoveOutput,
  onStageChain,
  isExecuting = false,
  onClearStaging,
  savedBehaviorSets = [],
  onSaveBehaviorSet,
  loadedChain,
  onLoadedChainComplete,
  onStagedSequencesChange,
}: SequenceSetsProps) {
  const [savedSets, setSavedSets] = useState<SavedSet[]>([]);
  const nextSetNumber = savedSets.length + 1;

  const [namingOpen, setNamingOpen] = useState(false);
  const [behaviorName, setBehaviorName] = useState('');

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [hasStaged, setHasStaged] = useState(false);

  // NEW: For live preview of clicked sequence in debug panel
  const [previewSequence, setPreviewSequence] = useState<any[] | null>(null);

  useEffect(() => {
    if (loadedChain && loadedChain.length > 0) {
      setSavedSets(loadedChain);
      onLoadedChainComplete();
    }
  }, [loadedChain, onLoadedChainComplete]);

  const handleAddSet = () => {
    if (inputSequences.length === 0) return;

    const newSet: SavedSet = {
      id: `set-${Date.now()}`,
      inputs: [...inputSequences],
      outputs: [],
      label: `Set ${nextSetNumber}`,
    };

    setSavedSets(prev => [...prev, newSet]);
    onClearStaging?.();
  };

  const handleRemoveSet = (id: string) => {
    setSavedSets(prev => prev.filter(s => s.id !== id));
  };

const stageAndShow = (setsToStage: SavedSet[]) => {
  if (setsToStage.length === 0) return;

  onStageChain(setsToStage);

  const allSequences = setsToStage.flatMap(set => set.inputs);

  // ← THIS IS THE CRITICAL MISSING LINE
  onStagedSequencesChange?.(allSequences);

  window.__stagedSequencesForDebug = allSequences;

  setHasStaged(true);
};

  const handleStageAll = () => {
    stageAndShow(savedSets);
  };

  const handleStageNow = () => {
    if (inputSequences.length === 0) return;

    const tempSet: SavedSet = {
      id: `temp-single-set-${Date.now()}`,
      inputs: inputSequences.map(seq => [...seq]),
      outputs: [],
      label: 'Instant Sequence',
    };

    stageAndShow([tempSet]);
  };

  const handleClearDebug = () => {
    setHasStaged(false);
    window.__stagedSequencesForDebug = undefined;
  };

  const openNaming = () => {
    if (savedSets.length === 0) return;
    setBehaviorName('');
    setNamingOpen(true);
  };

  const confirmSaveBehaviorSet = () => {
    if (!behaviorName.trim()) return;

    const totalInputs = savedSets.reduce((sum, s) => sum + s.inputs.length, 0);

    const newBehaviorSet: SavedBehaviorSet = {
      id: `behavior-${Date.now()}`,
      label: behaviorName.trim(),
      inputCount: totalInputs,
      outputCount: 0,
      chain: savedSets.map(set => ({
        label: set.label,
        inputs: set.inputs.map(seq => [...seq]),
        outputs: [],
      })),
    };

    onSaveBehaviorSet(newBehaviorSet);
    setNamingOpen(false);
    setBehaviorName('');
  };

  // === DYNAMIC SPECIAL SEQUENCE DETECTION (updated for SEQUENCE_PROCESSORS) ===
  // === DYNAMIC SPECIAL SEQUENCE DETECTION (works on preview OR staged) ===
  const currentDisplaySequence = previewSequence || window.__stagedSequencesForDebug?.[0];

  const matchedProcessors: SequenceProcessor[] =
    currentDisplaySequence && Array.isArray(SEQUENCE_PROCESSORS)
      ? SEQUENCE_PROCESSORS.filter((processor: SequenceProcessor) => {
          const folderIdsInSequence = currentDisplaySequence.map((node: any) => node.parentFolderId);
          const requiredFolderIds = processor.pattern.map(step => step.folderId);
          return requiredFolderIds.every(id => folderIdsInSequence.includes(id));
        })
      : [];

  const activeDetector = matchedProcessors[0] || null;
  const hasSpecialSequence = !!activeDetector;

  return (
    <Box sx={{ mt: 4, p: 4, bgcolor: '#ffffff', border: '2px solid #e0e0e0', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 500, color: '#222222', textAlign: 'left' }}>
        Behavior Mapping
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, height: '280px', alignItems: 'stretch' }}>
        {/* LEFT: Behavior Items + Defined Sets */}
        <Box
          sx={{
            flex: '2 1 0%',
            minWidth: 300,
            borderRadius: '12px',
            bgcolor: '#f8fdff',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #bbe3f7',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#222', mb: 2 }}>
            Behavior Items
          </Typography>

          <Box sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
            {inputSequences.length > 0 ? (
              <List dense disablePadding>
                {inputSequences.map((seq, i) => (
                  <ListItem
                    key={i}
                    disablePadding
                    selected={selectedIndex === i}
                    onClick={() => {
                      const newIndex = selectedIndex === i ? null : i;
                      setSelectedIndex(newIndex);
                      // Preview the clicked sequence instantly
                      setPreviewSequence(newIndex !== null ? inputSequences[newIndex] : null);
                    }}
                    sx={{
                      py: 0.6,
                      borderRadius: '6px',
                      cursor: 'pointer',
                      '&.Mui-selected': { bgcolor: '#e3f2fd', '&:hover': { bgcolor: '#bbdefb' } },
                      '&:hover': { bgcolor: '#f5f5f5' },
                    }}
                  >
                    <ListItemText
                      primary={seq.map((n: any) => n.displayLabel || n.customName || n.name || 'Node').join(' → ')}
                      primaryTypographyProps={{
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        color: selectedIndex === i ? '#1976d2' : 'inherit',
                      }}
                    />
                    <IconButton size="small" onClick={(e) => { e.stopPropagation(); onRemoveInput(i); }} sx={{ color: '#d32f2f' }}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography sx={{ color: '#888', fontStyle: 'italic', textAlign: 'center', mt: 4 }}>
                No behavior items defined
              </Typography>
            )}
          </Box>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleStageNow}
              disabled={inputSequences.length === 0}
              sx={{
                bgcolor: '#00A4EF',
                color: '#FFFFFF',
                fontWeight: 500,
                '&:hover': { bgcolor: '#0088cc' },
              }}
            >
              Stage Now
              <Tooltip title="Instantly stages current sequence" arrow>
                <HelpOutlineIcon sx={{ ml: 1, fontSize: '1rem', opacity: 0.8 }} />
              </Tooltip>
            </Button>

            <Button
              variant="outlined"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleAddSet}
              disabled={inputSequences.length === 0}
              sx={{
                borderColor: '#00A4EF',
                color: '#00A4EF',
                fontWeight: 500,
                '&:hover': { bgcolor: 'rgba(0,164,239,0.04)' },
              }}
            >
              Add to Sequence Set {nextSetNumber}
            </Button>
          </Box>

          {/* Defined Sets */}
          {savedSets.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500, color: '#333' }}>
                Defined Sets ({savedSets.length})
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {savedSets.map((set) => (
                  <Box
                    key={set.id}
                    sx={{
                      bgcolor: '#f8f9fa',
                      p: 2,
                      borderRadius: '8px',
                      border: '1px solid #dee2e6',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 600, flex: 1, mr: 2 }}>
                      {set.label}:{' '}
                      {set.inputs.map((seq, seqIdx) => (
                        <span key={seqIdx}>
                          {seqIdx > 0 && ' | '}
                          <span style={{ fontWeight: 400, color: '#0066cc' }}>
                            {seq.map((node: any) => node.displayLabel || node.customName || node.name || 'Node').join(' → ')}
                          </span>
                        </span>
                      ))}
                      {' '}({set.inputs.length} item{set.inputs.length !== 1 ? 's' : ''})
                    </Typography>
                    <IconButton size="small" onClick={() => handleRemoveSet(set.id)} sx={{ color: '#d32f2f' }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {/* RIGHT: Debug Panel */}
        <StagedSequencesDebug
          // Show preview first, then real staged sequences
          stagedSequences={
            previewSequence
              ? [previewSequence]
              : window.__stagedSequencesForDebug || []
          }
          hasStaged={hasStaged || !!previewSequence}
          hasSpecialSequence={hasSpecialSequence}
          activeDetector={activeDetector}
          onClear={() => {
            handleClearDebug();
            setPreviewSequence(null);
            setSelectedIndex(null);
          }}
          // Optional: helps StagedSequencesDebug show it's a preview
          isPreviewMode={!!previewSequence && !window.__stagedSequencesForDebug}
        />
      </Box>

      {/* ACTION BUTTONS */}
      <Box sx={{ mt: 4, display: 'flex', gap: 3, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleStageAll}
          disabled={isExecuting || savedSets.length === 0}
          startIcon={<MovieCreationOutlinedIcon />}
          sx={{
            bgcolor: '#00A4EF',
            color: '#FFFFFF',
            fontWeight: 500,
            px: 6,
            py: 2,
            borderRadius: '8px',
            '&:hover': { bgcolor: '#0088cc' },
          }}
        >
          {isExecuting ? 'Executing...' : `Stage Chain (${savedSets.length} Set${savedSets.length !== 1 ? 's' : ''})`}
        </Button>

        <Button
          variant="contained"
          size="large"
          startIcon={<SaveIcon />}
          onClick={openNaming}
          disabled={savedSets.length === 0}
          sx={{
            bgcolor: '#1976d2',
            color: '#FFFFFF',
            fontWeight: 500,
            px: 6,
            py: 2,
            borderRadius: '8px',
            '&:hover': { bgcolor: '#1565c0' },
          }}
        >
          Save Chain as Behavior Set
        </Button>
      </Box>

      {/* NAMING FORM */}
      {namingOpen && (
        <Box
          sx={{
            mt: 3,
            p: 3,
            bgcolor: '#f5f9ff',
            borderRadius: '12px',
            border: '2px dashed #90caf9',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Name this Behavior Set:
          </Typography>
          <TextField
            autoFocus
            size="small"
            placeholder="e.g., Patrol Route, Combat Stance"
            value={behaviorName}
            onChange={(e) => setBehaviorName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && confirmSaveBehaviorSet()}
            sx={{ minWidth: 320 }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" onClick={() => setNamingOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={confirmSaveBehaviorSet}
              disabled={!behaviorName.trim()}
              sx={{ bgcolor: '#1976d2', color: '#FFFFFF', '&:hover': { bgcolor: '#1565c0' } }}
            >
              Save Behavior Set
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}