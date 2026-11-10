'use client';

import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Chip from '@mui/material/Chip';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const allActionsData = [
  { id: 'select', label: 'Select' },
  { id: 'copy', label: 'Copy' },
  { id: 'remove', label: 'Remove' },
  { id: 'add', label: 'Add' },
  { id: 'rename', label: 'Rename' },
  { id: 'split', label: 'Split' },
  { id: 'merge', label: 'Merge' },
  { id: 'insert', label: 'Insert' },
  { id: 'replace', label: 'Replace' },
];

interface HierarchyNode {
  id: string;
  name: string;
  isFolder: boolean;
  metadata?: { attributes?: Record<string, any> };
}

interface SetNodeActionsProps {
  selectedAction: string | null;
  setSelectedAction: (action: string | null) => void;
  selectedTreeNode: HierarchyNode | null;
  activeSequenceIndex: number | null;
  consoleOutput: string[];
  updateActionLog: (log: string[]) => void;
  selectedNodeId: string | null;
  onActionAdded: (nodeId: string, action: string, setting?: string) => void;
  pendingAttributes: Record<string, any>;
  selectedPinnedNode: any;
  updatePinnedNodes: (nodes: any[]) => void;
  setPendingAttributes: (attrs: Record<string, any>) => void;
  successMessage: string | null;
  setSuccessMessage: (msg: string | null) => void;
  activeEnvironment: any;
}

export default function SetNodeActions({
  selectedAction,
  setSelectedAction,
  selectedTreeNode,
  activeSequenceIndex,
  consoleOutput,
  updateActionLog,
  selectedNodeId,
  onActionAdded,
  selectedPinnedNode,
  updatePinnedNodes,
  successMessage,
  setSuccessMessage,
  activeEnvironment,
}: SetNodeActionsProps) {
  const [internalSelectedAction, setInternalSelectedAction] = useState<string>('');
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  React.useEffect(() => {
    if (selectedAction !== internalSelectedAction) {
      setInternalSelectedAction(selectedAction || '');
    }
  }, [selectedAction]);

  const handleActionSelect = (actionId: string) => {
    setInternalSelectedAction(actionId);
    setSelectedAction(actionId);
  };

  const toggleCategories = () => {
    setIsCategoriesOpen(prev => !prev);
  };

  const getNextCreatedId = (parentFolderId: string): string => {
    const allNodes = activeEnvironment?.pinnedNodes ?? [];
    let highest = 0;
    for (const node of allNodes) {
      if (node.parentFolderId === parentFolderId && node.id.startsWith('created_')) {
        const match = node.id.match(/^created_(\d+)_/);
        if (match) {
          const num = parseInt(match[1], 10);
          if (num > highest) highest = num;
        }
      }
    }
    return `created_${highest + 1}_${parentFolderId}`;
  };

  const handleAddActionItem = () => {
    if (!internalSelectedAction) return;

    if (internalSelectedAction === 'copy' && selectedPinnedNode) {
      const original = selectedPinnedNode;

      const siblings = (activeEnvironment?.pinnedNodes ?? []).filter(
        (node: any) => node.parentFolderId === original.parentFolderId
      );

      let baseName = original.name;
      const copyMatch = original.name.match(/\s*\(Copy\)$/);
      const numberMatch = original.name.match(/\s+(\d+)$/);

      if (copyMatch) baseName = original.name.replace(/\s*\(Copy\)$/, '').trim();
      else if (numberMatch) baseName = original.name.replace(/\s+\d+$/, '').trim();

      const escapedBase = baseName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`^${escapedBase}(?:\\s+\\(Copy\\)|\\s+(\\d+))?$`);

      let highestNum = 0;
      siblings.forEach((node: any) => {
        const match = node.name.match(regex);
        if (match) {
          if (node.name.includes('(Copy)')) highestNum = Math.max(highestNum, 1);
          else if (match[1]) highestNum = Math.max(highestNum, parseInt(match[1]));
        }
      });

      const newName = highestNum === 0 ? `${baseName} (Copy)` : `${baseName} ${highestNum + 1}`;

      const newId = getNextCreatedId(original.parentFolderId);
      const now = new Date();

      const copiedNode = {
        id: newId,
        name: newName,
        fullPath: original.fullPath,
        createdAt: now,
        parentFolderId: original.parentFolderId,
        attributes: JSON.parse(JSON.stringify(original.attributes || {})),
      };

      if (copiedNode.attributes) {
        copiedNode.attributes.CreateTime = now.toISOString();
      }

      const updatedPinned = [...(activeEnvironment?.pinnedNodes ?? []), copiedNode];
      updatePinnedNodes(updatedPinned);

      setSuccessMessage(`Copied as "${newName}"`);
      setTimeout(() => setSuccessMessage(null), 5000);

      if (activeSequenceIndex !== null) {
        const updatedLine = `copy "${original.name}" → "${newName}"`;
        const newLog = [...consoleOutput];
        newLog[activeSequenceIndex] = updatedLine;
        updateActionLog(newLog);
      }
    } else {
      const actionLabel = allActionsData.find(a => a.id === internalSelectedAction)?.label || '';
      if (selectedNodeId) onActionAdded(selectedNodeId, actionLabel);

      if (activeSequenceIndex !== null) {
        const currentLine = consoleOutput[activeSequenceIndex] ?? '';
        const updatedLine = `${internalSelectedAction} ${currentLine}`;
        const newLog = [...consoleOutput];
        newLog[activeSequenceIndex] = updatedLine;
        updateActionLog(newLog);
      }
    }

    setInternalSelectedAction('');
    setSelectedAction(null);
  };

  const sortedActions = useMemo(() => {
    return [...allActionsData].sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  const isCopyMode = internalSelectedAction === 'copy';

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
        {/* Left: Operation Categories */}
        <Box sx={{ flex: 1, minWidth: 240 }}>
          <Button
            variant="text"
            onClick={toggleCategories}
            startIcon={isCategoriesOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            sx={{
              p: 0,
              justifyContent: 'flex-start',
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'text.primary',
              '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
            }}
          >
            Operation Categories
          </Button>

          <Collapse in={isCategoriesOpen} timeout="auto" unmountOnExit>
            <Box sx={{ mt: 2, pl: 0.5 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5 }}>
                {sortedActions.map((action) => (
                  <Chip
                    key={action.id}
                    label={action.label}
                    clickable
                    onClick={() => handleActionSelect(action.id)}
                    color={internalSelectedAction === action.id ? 'primary' : 'default'}
                    variant={internalSelectedAction === action.id ? 'filled' : 'outlined'}
                    sx={{
                      justifyContent: 'flex-start',
                      fontWeight: internalSelectedAction === action.id ? 600 : 400,
                      height: 36,
                      fontSize: '0.9rem',
                      '&:hover': {
                        bgcolor: internalSelectedAction === action.id ? 'primary.dark' : 'action.hover',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Collapse>

          {internalSelectedAction && !isCategoriesOpen && (
            <Typography sx={{ mt: 2, pl: 1, fontSize: '0.95rem', color: 'primary.main', fontWeight: 500 }}>
              Selected: {allActionsData.find(a => a.id === internalSelectedAction)?.label}
            </Typography>
          )}
        </Box>

        {/* Right: Add Operation button */}
        {internalSelectedAction && (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 3.5 }}>
            <Button
              variant="contained"
              onClick={handleAddActionItem}
              sx={{
                textTransform: 'none',
                bgcolor: '#169AFC',
                color: '#ffffff',
                fontWeight: 500,
                px: 4,
                py: 1.5,
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(22, 154, 252, 0.3)',
                '&:hover': {
                  bgcolor: '#0458d6',
                  boxShadow: '0 6px 16px rgba(22, 154, 252, 0.4)',
                },
                '&:active': {
                  transform: 'translateY(1px)',
                },
              }}
            >
              Add Operation
            </Button>
          </Box>
        )}
      </Box>

      {/* Full-width blue status box — now correctly full-width and properly placed */}
      <Box sx={{ mt: 4, width: '100%' }}>
        <Box
          sx={{
            width: '100%',
            minHeight: 240,
            p: 6,
            background: 'linear-gradient(135deg, #4050e0 0%, #169AFC 80%)',
            borderRadius: '16px',
            border: '1px dashed rgba(80, 200, 220, 0.4)',
            boxShadow: '0 4px 20px rgba(10, 60, 80, 0.4)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Subtle success message */}
          {successMessage && (
            <Typography
              sx={{
                alignSelf: 'flex-start',
                mb: 3,
                p: 1.5,
                bgcolor: 'rgba(0, 255, 150, 0.15)',
                borderLeft: '4px solid #00ff9d',
                color: '#00ff9d',
                fontWeight: 600,
                fontSize: '1rem',
                fontFamily: '"Roboto Mono", monospace',
                borderRadius: '0 8px 8px 0',
              }}
            >
              ✓ {successMessage}
            </Typography>
          )}

          <Typography
            sx={{
              fontFamily: '"Roboto Mono", "Courier New", monospace',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#88c8e0',
              letterSpacing: '1.2px',
              mb: 2,
              textAlign: 'center',
            }}
          >
            {isCopyMode && selectedPinnedNode
              ? `Ready to duplicate: "${selectedPinnedNode.name}"`
              : internalSelectedAction
              ? `Selected: ${allActionsData.find(a => a.id === internalSelectedAction)?.label}`
              : 'No operation selected'}
          </Typography>

          <Typography
            sx={{
              fontFamily: '"Roboto Mono", "Courier New", monospace',
              fontSize: '1.05rem',
              color: '#ffffff',
              opacity: 0.95,
              lineHeight: 1.8,
              textAlign: 'center',
            }}
          >
            {isCopyMode && selectedPinnedNode
              ? `Click "Add Operation" to create a perfect copy.\nNew name: smart & automatic → (Copy) or 2, 3, 4...`
              : internalSelectedAction
              ? 'Click "Add Operation" to apply.'
              : 'Open "Operation Categories" → pick one → then "Add Operation"'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}