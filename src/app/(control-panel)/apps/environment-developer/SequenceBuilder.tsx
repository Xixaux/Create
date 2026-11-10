'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MovieCreationOutlinedIcon from '@mui/icons/material/MovieCreationOutlined';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import SequenceSets from './SequenceSets';
import { PinnedNode } from './CreateNewNode';
import { useExecuteSequence } from './hooks/useExecuteSequence';
import SavedSequences from './SavedSequences';
import NodeInstructions from './NodeInstructions';

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

interface SavedSet {
  id: string;
  label: string;
  inputs: SequenceItem[][];
  outputs: SequenceItem[][];
}

export default function SequenceBuilder({
  setActionStagingContent,
  pinnedNodes = [],
  virtualizedPhysicalObjects = [],
  definedActions = [],
  onNewObjectsCreated,
  onStagedSequencesChange,
}: {
  setActionStagingContent: (content: string | null) => void;
  pinnedNodes?: PinnedNode[];
  virtualizedPhysicalObjects?: PinnedNode[];
  definedActions?: PinnedNode[];
  onNewObjectsCreated?: (nodes: PinnedNode[]) => void;
  onStagedSequencesChange?: (sequences: any[][]) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [buildSequenceItems, setBuildSequenceItems] = useState<SequenceItem[]>([]);

  const [savedSequences, setSavedSequences] = useState<SequenceItem[][]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('sequencePanel_savedSequences');
    return saved ? JSON.parse(saved) : [];
  });

  const [quickSavedSequences, setQuickSavedSequences] = useState<SequenceItem[][]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('quickSavedSequences');
    return saved ? JSON.parse(saved) : [];
  });

  const [savedBehaviorSets, setSavedBehaviorSets] = useState<SavedBehaviorSet[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('sequencePanel_savedBehaviorSets');
    return saved ? JSON.parse(saved) : [];
  });

  const [inputSequences, setInputSequences] = useState<SequenceItem[][]>([]);
  const [outputSequences, setOutputSequences] = useState<SequenceItem[][]>([]);

  const [loadedChain, setLoadedChain] = useState<SavedSet[] | null>(null);

  const [selectedSequenceIndex, setSelectedSequenceIndex] = useState<number | null>(null);
  const [sequenceNameInput, setSequenceNameInput] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [sequenceToDelete, setSequenceToDelete] = useState<number | null>(null);
  const [sequenceNameToDelete, setSequenceNameToDelete] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('sequencePanel_savedSequences', JSON.stringify(savedSequences));
  }, [savedSequences]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('quickSavedSequences', JSON.stringify(quickSavedSequences));
  }, [quickSavedSequences]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('sequencePanel_savedBehaviorSets', JSON.stringify(savedBehaviorSets));
  }, [savedBehaviorSets]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('sequencePanel_inputSequences', JSON.stringify(inputSequences));
    localStorage.setItem('sequencePanel_outputSequences', JSON.stringify(outputSequences));
  }, [inputSequences, outputSequences]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__sequencePanelInstance = {
        outputSequences,
        setActionStagingContent,
      };
    }
  }, [outputSequences, setActionStagingContent]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('sequencePanel_buildSequenceItems');
    if (saved) setBuildSequenceItems(JSON.parse(saved));
  }, []);

  const allCreatedNodes = useMemo(() => {
    return [...pinnedNodes, ...virtualizedPhysicalObjects, ...definedActions].filter(
      (node) => node.id.startsWith('created_')
    );
  }, [pinnedNodes, virtualizedPhysicalObjects, definedActions]);

  const categoryRules: Record<string, (parentId: string) => boolean> = {
    Object: (id) => id.startsWith('1.'),
    Logic: (id) => id.startsWith('2.2.'),
    Action: (id) => /^2\.1\.9(\.\d+)*$/.test(id),
    Number: (id) => id === '2.1.1',
    Operators: (id) => id.startsWith('2.1.1.1.1.'),
    Variable: (id) => id === '2.4',
    Shape: (id) => id.startsWith('2.1.2.6.'),
    Value: (id) => id === '2.5' || id.startsWith('2.5.'),
    Movement: (id) => 
      id.startsWith('1.') ||
      id === '2.1.3.1.26' ||
      id === '2.1.5.1' || 
      id.startsWith('2.1.5.1.'),
  };

  const getCategoryLabel = (parentId: string): string => {
    if (parentId.startsWith('1.1.')) return 'Person';
    if (parentId.startsWith('1.2.')) return 'Place';
    if (parentId.startsWith('1.3.')) return 'Thing';
    if (parentId === '2.1.1') return 'Number';
    if (parentId.startsWith('2.1.1.1.1.')) return 'Operator';
    if (parentId.startsWith('2.2.')) return 'Logic';
    if (/^2\.1\.9(\.\d+)*$/.test(parentId)) return 'Action';
    if (parentId === '2.4') return 'Variable';
    if (parentId.startsWith('2.1.2.6.')) return 'Shape';
    if (parentId === '2.5' || parentId.startsWith('2.5.')) return 'Value';
    if (parentId.startsWith('2.1.5.1.')) return 'Movement';
    if (parentId.startsWith('1.')) return 'Object';
    return 'Unknown';
  };

  const getRoleLabel = (node: PinnedNode): string => {
    const nodeDefinition = node.attributes?.nodeDefinition;
    if (!nodeDefinition) return node.name;
    if (nodeDefinition.value !== undefined) return String(nodeDefinition.value);
    if (nodeDefinition.symbol !== undefined) return nodeDefinition.symbol;
    if (nodeDefinition.word !== undefined) return nodeDefinition.word;
    if (nodeDefinition.name !== undefined) return nodeDefinition.name;
    if (nodeDefinition.hex !== undefined) return nodeDefinition.hex;
    return node.name;
  };

  const getDisplayLabel = (node: PinnedNode): string => {
    const role = getRoleLabel(node);
    return role === node.name || !role ? node.name : `${node.name} (${role})`;
  };

  const filteredItems = useMemo(() => {
    if (!selectedCategory) return [];
    const rule = categoryRules[selectedCategory];
    return allCreatedNodes
      .filter((node) => rule(node.parentFolderId))
      .map((node) => ({
        id: node.id,
        name: node.name,
        fullPath: node.fullPath,
        parentFolderId: node.parentFolderId,
        categoryLabel: getCategoryLabel(node.parentFolderId),
        roleLabel: getRoleLabel(node),
        displayLabel: getDisplayLabel(node),
        attributes: node.attributes,
      }));
  }, [selectedCategory, allCreatedNodes]);

  const handleCategorySelect = (category: string) => setSelectedCategory(category);
  const handleBackToCategories = () => setSelectedCategory(null);

  const handleItemSelect = (item: typeof filteredItems[0]) => {
    const seqItem: SequenceItem = {
      type: 'node',
      id: item.id,
      name: item.name,
      fullPath: item.fullPath,
      parentFolderId: item.parentFolderId,
      categoryLabel: item.categoryLabel,
      roleLabel: item.roleLabel,
      displayLabel: item.displayLabel,
      attributes: item.attributes,
    };
    setBuildSequenceItems((prev) => [...prev, seqItem]);
  };

  const removeFromBuildSequence = (index: number) => {
    setBuildSequenceItems((prev) => prev.filter((_, i) => i !== index));
  };

  const addToDefinedSequence = () => {
    if (buildSequenceItems.length === 0) return;
    const newSequence = [...buildSequenceItems];
    setSavedSequences((prev) => {
      const updated = [...prev, newSequence];
      if (typeof window !== 'undefined') {
        window.__definedSequences = updated;
      }
      return updated;
    });
    setInputSequences((prev) => [...prev, newSequence]);
    setBuildSequenceItems([]);
  };

  const handleSaveNamedSequence = () => {
    if (buildSequenceItems.length === 0) return;
    const name = sequenceNameInput.trim();
    if (!name) {
      alert('Please enter a name for the sequence');
      return;
    }

    const namedItems = buildSequenceItems.map((item) => ({
      ...item,
      customName: name,
    }));

    setQuickSavedSequences((prev) => [...prev, namedItems]);
    setSequenceNameInput('');
  };

  const deleteSequence = (index: number) => {
    setSavedSequences((prev) => prev.filter((_, i) => i !== index));
    if (selectedSequenceIndex === index) setSelectedSequenceIndex(null);
  };

  const handleDeleteQuickSequence = (index: number, name: string) => {
    setSequenceToDelete(index);
    setSequenceNameToDelete(name);
    setDeleteConfirmOpen(true);
  };

  const confirmDeleteQuickSequence = () => {
    if (sequenceToDelete !== null) {
      setQuickSavedSequences((prev) => prev.filter((_, i) => i !== sequenceToDelete));
      setSequenceToDelete(null);
      setSequenceNameToDelete('');
    }
    setDeleteConfirmOpen(false);
  };

  const handleDeleteBehaviorSet = (id: string) => {
    setSavedBehaviorSets((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSendToBehaviorMapping = () => {
    if (selectedSequenceIndex === null) return;
    const seq = savedSequences[selectedSequenceIndex];
    setInputSequences((prev) => [...prev, seq]);
  };

  const handleLoadBehaviorSet = (set: SavedBehaviorSet) => {
    if ('chain' in set && Array.isArray(set.chain)) {
      const restoredSets: SavedSet[] = set.chain.map((chainItem, index) => ({
        id: `restored-${Date.now()}-${index}`,
        label: chainItem.label,
        inputs: chainItem.inputs.map((seq) => [...seq]),
        outputs: [],
      }));
      setLoadedChain(restoredSets);
    } else if ('inputs' in set) {
      setInputSequences((set as any).inputs.map((s: SequenceItem[]) => [...s]));
    }

    setInputSequences([]);
    setOutputSequences([]);
  };

  const { execute, isExecuting } = useExecuteSequence({
    onNewNodes: (nodes) => onNewObjectsCreated?.(nodes),
  });

  const queueSequenceStaging = (sequences: any[], source: 'input' | 'output') => {
    if (sequences.length === 0) return;

    let index = 0;

    const stageNext = () => {
      if (index >= sequences.length) {
        if (source === 'output') {
          (window as any).__lastStagedOutput = sequences;
        }
        return;
      }

      const sequence = sequences[index];
      index++;

      const structuredSequence = sequence.map((item: any) => ({
        id: item.id,
        name: item.name,
        displayName: item.displayLabel,
        category: item.categoryLabel,
        roleValue: item.roleLabel,
        parentFolderId: item.parentFolderId,
        fullPath: item.fullPath,
        nodeDefinition: item.attributes?.nodeDefinition || null,
        assignedTraits: item.attributes?.assignedTraits || null,
        attributes: item.attributes || null,
        createdAt: item.attributes?.CreateTime || null,
      }));

      const humanReadable = sequence
        .map((s: any) => `${s.customName ? `${s.customName}: ` : ''}${s.name}`)
        .join(' to ');

      const jsonPayload = JSON.stringify(
        {
          type: 'structured_sequence_v2',
          version: '2.0',
          timestamp: new Date().toISOString(),
          count: structuredSequence.length,
          display: humanReadable,
          sequence: structuredSequence,
          source: source === 'output' ? 'output' : undefined,
        },
        null,
        2
      );

      setActionStagingContent(jsonPayload);

      requestAnimationFrame(stageNext);
    };

    setActionStagingContent(null);
    requestAnimationFrame(stageNext);
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          p: 2,
          mt: 3,
          mb: 2,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {/* LIBRARY OVERVIEW + SAVED SEQUENCES */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box
            sx={{
              flex: 1,
              bgcolor: '#ffffff',
              color: '#333333',
              borderRadius: '16px',
              p: 3,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              fontFamily: '"Roboto Mono", monospace',
              display: 'flex',
              flexDirection: 'column',
              height: '400px',
              transition: 'box-shadow 0.2s ease',
              '&:hover': {
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                mb: 3,
                color: '#1a1a1a',
                fontSize: '1.1rem',
                letterSpacing: '0.3px',
              }}
            >
              Library Overview
            </Typography>

            <List dense disablePadding sx={{ flex: 1 }}>
              <ListItemButton
                disablePadding
                sx={{
                  justifyContent: 'space-between',
                  py: 1.5,
                  borderRadius: '8px',
                  px: 1,
                  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Created Things
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#00A4EF',
                    fontWeight: 500,
                    fontSize: '1.00rem',
                  }}
                >
                  {allCreatedNodes.length}
                </Typography>
              </ListItemButton>

              <ListItemButton
                disablePadding
                sx={{
                  justifyContent: 'space-between',
                  py: 1.5,
                  borderRadius: '8px',
                  px: 1,
                  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Physical Things
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#00A4EF',
                    fontWeight: 500,
                    fontSize: '1.00rem',
                  }}
                >
                  {allCreatedNodes.filter((node) => node.parentFolderId.startsWith('1.')).length}
                </Typography>
              </ListItemButton>

              <ListItemButton
                disablePadding
                sx={{
                  justifyContent: 'space-between',
                  py: 1.5,
                  borderRadius: '8px',
                  px: 1,
                  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Created Node Categories
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#00A4EF',
                    fontWeight: 500,
                    fontSize: '1.00rem',
                  }}
                >
                  {Array.from(
                    new Set(
                      allCreatedNodes
                        .map((node) => node.parentFolderId.split('.')[0])
                        .filter(Boolean)
                    )
                  ).length}
                </Typography>
              </ListItemButton>
            </List>
          </Box>

          <SavedSequences
            quickSavedSequences={quickSavedSequences}
            onLoadSequence={(sequence) => setBuildSequenceItems(sequence)}
            onDeleteSequence={handleDeleteQuickSequence}
            savedBehaviorSets={savedBehaviorSets}
            onLoadBehaviorSet={handleLoadBehaviorSet}
            onDeleteBehaviorSet={handleDeleteBehaviorSet}
          />
        </Box>

        <Dialog
          open={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          aria-labelledby="delete-confirm-title"
          aria-describedby="delete-confirm-description"
        >
          <DialogTitle id="delete-confirm-title" sx={{ color: '#d32f2f', fontWeight: 600 }}>
            Delete Sequence?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-confirm-description">
              Are you sure you want to permanently delete this sequence?
              <br />
              <br />
              <strong>{sequenceNameToDelete}</strong>
              <br />
              <br />
              <em>This action cannot be undone.</em>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmOpen(false)} sx={{ color: 'text.secondary' }}>
              Cancel
            </Button>
            <Button onClick={confirmDeleteQuickSequence} variant="contained" color="error" autoFocus>
              Delete Forever
            </Button>
          </DialogActions>
        </Dialog>

        {/* DEFINE A SEQUENCE */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 500, color: 'text.primary' }}>
            Define a Sequence
          </Typography>

          {!selectedCategory ? (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {(['Object', 'Logic', 'Shape', 'Action', 'Number', 'Operators', 'Variable', 'Value', 'Movement'] as const).map(
                (cat) => (
                  <Button
                    key={cat}
                    variant="contained"
                    size="small"
                    onClick={() => handleCategorySelect(cat)}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 500,
                      backgroundColor: '#00A4EF',
                      color: selectedCategory === cat ? '#1976d2' : '#FFFFFF',
                      '&:hover': {
                        backgroundColor: '#0088cc',
                        color: selectedCategory === cat ? '#1976d2' : '#FFFFFF',
                      },
                      fontWeight: selectedCategory === cat ? 600 : 500,
                      boxShadow: selectedCategory === cat ? '0 0 0 2px #1976d2' : 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {cat}
                  </Button>
                )
              )}
            </Box>
          ) : (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  size="small"
                  startIcon={<ArrowBackIcon />}
                  onClick={handleBackToCategories}
                  sx={{ textTransform: 'none', color: '#00A4EF' }}
                >
                  Back
                </Button>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {selectedCategory} Items
                </Typography>
              </Box>

              <Box
                sx={{
                  maxHeight: '140px',
                  overflowY: 'auto',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  bgcolor: '#f9f9f9',
                  p: 1,
                }}
              >
                {filteredItems.length > 0 ? (
                  <List disablePadding dense>
                    {filteredItems.map((item, index) => (
                      <ListItemButton
                        key={index}
                        onClick={() => handleItemSelect(item)}
                        sx={{ borderRadius: '6px', mb: 0.5 }}
                      >
                        <ListItemText
                          primary={item.displayLabel}
                          secondary={item.fullPath}
                          primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 500, color: '#1976d2' }}
                          secondaryTypographyProps={{ fontSize: '0.85rem', color: '#42a5f5' }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                ) : (
                  <Typography color="text.secondary" sx={{ fontStyle: 'italic', p: 1 }}>
                    No items in this category
                  </Typography>
                )}
              </Box>
            </>
          )}

          <Box
            sx={{
              minHeight: 360,
              maxHeight: 560,
              overflowY: 'auto',
              bgcolor: '#f9f9f9',
              border: '1px solid #ddd',
              borderRadius: '8px',
              p: 2,
            }}
          >
            {buildSequenceItems.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {buildSequenceItems.map((item, i) => (
                  <Box
                    key={i}
                    sx={{
                      bgcolor: 'white',
                      p: 2.1,
                      borderRadius: '8px',
                      border: '1px solid #e0e0e0',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      position: 'relative',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#222' }}>
                      Node {i + 1}: {item.name}
                      {item.customName && ` — "${item.customName}"`}
                    </Typography>
                    <Box sx={{ mt: 2, fontSize: '0.75rem', color: '#444', lineHeight: 1.6 }}>
                      <div>
                        <strong>Category:</strong> {item.categoryLabel}
                      </div>
                      <div>
                        <strong>Path:</strong>{' '}
                        <span style={{ fontSize: '0.75rem', color: '#555' }}>{item.fullPath}</span>
                      </div>
                      {item.roleLabel && item.roleLabel !== item.name && (
                        <div>
                          <strong>Role:</strong> {item.roleLabel}
                        </div>
                      )}
                    </Box>
                    <IconButton
                      onClick={() => removeFromBuildSequence(i)}
                      sx={{ position: 'absolute', top: 12, right: 12 }}
                    >
                      <CloseIcon sx={{ color: '#d32f2f' }} />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 12, fontStyle: 'italic' }}>
                Click a category above to begin building your sequence
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                size="small"
                placeholder="Name sequence"
                value={sequenceNameInput}
                onChange={(e) => setSequenceNameInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveNamedSequence()}
                sx={{
                  width: 220,
                  '& .MuiOutlinedInput-root': {
                    fontSize: '0.75rem',
                    bgcolor: 'rgba(255,255,255,0.05)',
                    color: '#00A4EF',
                    '& fieldset': { borderColor: '#00A4EF' },
                    '&:hover fieldset': { borderColor: '#222' },
                  },
                }}
                variant="outlined"
              />
              <Button
                variant="outlined"
                size="small"
                onClick={handleSaveNamedSequence}
                disabled={buildSequenceItems.length === 0}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  borderColor: '#00A4EF',
                  color: '#00A4EF',
                  '&:hover': {
                    borderColor: '#0088cc',
                    bgcolor: 'rgba(0, 164, 239, 0.04)',
                  },
                }}
              >
                Save Sequence
              </Button>

              <Typography sx={{ fontSize: '0.75rem', color: '#666', mx: 0.5 }}>or</Typography>

              <Button
                variant="outlined"
                size="small"
                startIcon={<SaveIcon />}
                onClick={() => {
                  if (buildSequenceItems.length === 0) return;
                  setQuickSavedSequences((prev) => [...prev, [...buildSequenceItems]]);
                }}
                disabled={buildSequenceItems.length === 0}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  borderColor: '#00A4EF',
                  color: '#00A4EF',
                  '&:hover': {
                    borderColor: '#0088cc',
                    bgcolor: 'rgba(0, 164, 239, 0.04)',
                  },
                }}
              >
                Quick Save
              </Button>

              <Tooltip title="Use Quick Save 99% of the time" arrow>
                <IconButton size="small">
                  <HelpOutlineIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setBuildSequenceItems([])}
                disabled={buildSequenceItems.length === 0}
                sx={{
                  textTransform: 'none',
                  color: '#d32f2f',
                  borderColor: '#ffcdd2',
                  '&:hover': { bgcolor: '#ffebee' },
                }}
              >
                Clear All Nodes
              </Button>

              <Button
                variant="contained"
                size="small"
                onClick={addToDefinedSequence}
                disabled={buildSequenceItems.length === 0}
                sx={{ bgcolor: '#00A4EF', color: '#FFFFFF', '&:hover': { bgcolor: '#0088cc' } }}
              >
                Add to Defined Sequences
              </Button>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            p: 2,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '8px',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
            Defined Sequences
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
              sx={{
                maxHeight: '180px',
                overflowY: 'auto',
                bgcolor: '#f5f5f5',
                borderRadius: '8px',
                p: 1,
              }}
            >
              {savedSequences.length > 0 ? (
                <List disablePadding dense>
                  {savedSequences.map((seq, i) => (
                    <ListItemButton
                      key={i}
                      selected={selectedSequenceIndex === i}
                      onClick={() => setSelectedSequenceIndex(i)}
                      sx={{ borderRadius: '6px', mb: 0.5 }}
                    >
                      <ListItemText
                        primary={seq.map((s: any) => s.name).join(' to ')}
                      />
                      <Box sx={{ display: 'flex' }} onClick={(e) => e.stopPropagation()}>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickSavedSequences((prev) => [...prev, [...seq]]);
                          }}
                          sx={{ color: 'green' }}
                        >
                          <SaveIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSequence(i);
                          }}
                        >
                          <DeleteIcon fontSize="small" sx={{ color: '#d32f2f' }} />
                        </IconButton>
                      </Box>
                    </ListItemButton>
                  ))}
                </List>
              ) : (
                <Typography color="text.secondary" sx={{ fontStyle: 'italic', p: 2 }}>
                  No sequences loaded
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                minHeight: 140,
                bgcolor: '#fafafa',
                border: selectedSequenceIndex !== null ? '2px solid #00A4EF' : '2px dashed #0f0f0fff',
                borderRadius: '8px',
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {selectedSequenceIndex !== null ? (
                <>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 700, color: '#222222', textAlign: 'center', fontSize: '0.90rem' }}
                  >
                    Sequence {selectedSequenceIndex + 1} – Node Sequence Execution
                  </Typography>

                  <Box
                    sx={{
                      flex: 1,
                      overflowX: 'auto',
                      overflowY: 'hidden',
                      display: 'flex',
                      flexWrap: 'nowrap',
                      gap: 1.5,
                      alignItems: 'center',
                      pb: 1,
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        right: 0,
                        height: '1px',
                        background:
                          'repeating-linear-gradient(to right, transparent 0px, transparent 10px, #222222222222 10px, #222222 20px)',
                        backgroundSize: '20px 1px',
                        backgroundRepeat: 'repeat-x',
                        zIndex: 0,
                        pointerEvents: 'none',
                        transform: 'translateY(-50%)',
                      },
                    }}
                  >
                    {savedSequences[selectedSequenceIndex].map((item, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          minWidth: 160,
                          height: 120,
                          bgcolor: 'white',
                          border: '2px dashed #222',
                          borderRadius: '8px',
                          p: 3,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          fontSize: '0.85rem',
                          fontFamily: 'monospace',
                          color: '#222222',
                          boxShadow: '0 4px 12px rgba(0,164,239,0.15)',
                          flexShrink: 0,
                          position: 'relative',
                          zIndex: 1,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            boxShadow: '0 6px 16px rgba(0,164,239,0.15)',
                            borderStyle: 'dashed',
                          },
                        }}
                      >
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="subtitle2" noWrap fontWeight={700}>
                            {item.name}
                          </Typography>

                          {item.customName && (
                            <Typography variant="caption" display="block" color="secondary" fontSize="0.7rem">
                              “{item.customName}”
                            </Typography>
                          )}

                          <Typography
                            variant="caption"
                            display="block"
                            color="text.secondary"
                            fontSize="0.65rem"
                            sx={{ mt: 0.6, opacity: 0.88 }}
                          >
                            {item.fullPath.split(' to ').pop()?.trim() || 'Unknown'}
                          </Typography>

                          <Button
                            size="small"
                            variant="outlined"
                            sx={{
                              mt: 1.0,
                              fontSize: '0.68rem',
                              padding: '3px 9px',
                              textTransform: 'none',
                              borderColor: '#666',
                              color: '#333',
                              minWidth: 'auto',
                              '&:hover': {
                                borderColor: '#222222',
                                bgcolor: 'rgba(0,0,0,0.05)',
                              },
                            }}
                          >
                            View Attributes
                          </Button>
                        </Box>
                      </Box>
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 2 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleSendToBehaviorMapping}
                      disabled={selectedSequenceIndex === null}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 500,
                        minWidth: 180,
                        bgcolor: '#00A4EF',
                        color: '#FFFFFF',
                        '&:hover': {
                          bgcolor: '#0088cc',
                        },
                      }}
                    >
                      Send to Behavior Mapping
                    </Button>
                  </Box>
                </>
              ) : (
                <Typography variant="body2" sx={{ color: '#888', fontStyle: 'italic', textAlign: 'center', py: 6 }}>
                  Click a sequence above to view its node details
                </Typography>
              )}
            </Box>
          </Box>
        </Box>

        <SequenceSets
          inputSequences={inputSequences}
          outputSequences={outputSequences}
          onRemoveInput={(i) => setInputSequences((prev) => prev.filter((_, idx) => idx !== i))}
          onRemoveOutput={(i) => setOutputSequences((prev) => prev.filter((_, idx) => idx !== i))}
          onStageChain={(savedSets) => {
            console.log('Chain staged:', savedSets);
            setActionStagingContent(null);
            (window as any).setCurrentChain?.({
              sets: savedSets,
              summary: {
                setCount: savedSets.length,
                totalInputs: savedSets.reduce((sum, s) => sum + s.inputs.length, 0),
                totalOutputs: savedSets.reduce((sum, s) => sum + s.outputs.length, 0),
                totalSequences: savedSets.reduce((sum, s) => sum + s.inputs.length + s.outputs.length, 0),
                uniqueNodes: new Set(
                  savedSets
                    .flatMap((s) => [...s.inputs, ...s.outputs])
                    .flatMap((seq) => seq.map((n: any) => n.id))
                ).size,
              },
            });
          }}
          onClearStaging={() => {
            setInputSequences([]);
            setOutputSequences([]);
          }}
          isExecuting={isExecuting}
          savedBehaviorSets={savedBehaviorSets}
          onSaveBehaviorSet={(newSet) => {
            setSavedBehaviorSets((prev) => [...prev, newSet]);
          }}
          loadedChain={loadedChain}
          onLoadedChainComplete={() => setLoadedChain(null)}
          onStagedSequencesChange={onStagedSequencesChange}
        />

        <NodeInstructions />
      </Box>
    </>
  );
}

// Module-level code (outside the component - this was the syntax error source)
let __lastStagedOutput: any[] = [];

export const stageOutputSequence = () => {
  const panel = (window as any).__sequencePanelInstance;
  if (!panel) return;

  panel.setActionStagingContent(null);
  const sequencesToStage: any[] = [];

  setTimeout(() => {
    panel.outputSequences.forEach((sequence: any[], index: number) => {
      setTimeout(() => {
        const structuredSequence = sequence.map((item: any) => ({
          id: item.id,
          name: item.name,
          displayName: item.displayLabel,
          category: item.categoryLabel,
          roleValue: item.roleLabel,
          parentFolderId: item.parentFolderId,
          fullPath: item.fullPath,
          nodeDefinition: item.attributes?.nodeDefinition || null,
          assignedTraits: item.attributes?.assignedTraits || null,
          attributes: item.attributes || null,
          createdAt: item.attributes?.CreateTime || null,
        }));

        const humanReadable = sequence
          .map((s: any) => `${s.customName ? `${s.customName}: ` : ''}${s.name}`)
          .join(' to ');

        const jsonPayload = JSON.stringify(
          {
            type: 'structured_sequence_v2',
            version: '2.0',
            timestamp: new Date().toISOString(),
            count: structuredSequence.length,
            display: humanReadable,
            sequence: structuredSequence,
            source: 'output',
          },
          null,
          2
        );

        panel.setActionStagingContent(jsonPayload);
        sequencesToStage.push(sequence);
      }, index * 150);
    });

    setTimeout(() => {
      __lastStagedOutput = sequencesToStage;
    }, panel.outputSequences.length * 160);
  }, 100);
};

if (typeof window !== 'undefined') {
  (window as any).stageOutputSequence = stageOutputSequence;
}