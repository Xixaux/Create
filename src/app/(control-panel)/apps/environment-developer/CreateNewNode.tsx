'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Chip from '@mui/material/Chip';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import NodeActions from './NodeActions';
import { getRootNodes, type JsonNode } from './NodeHierarchy';
import PathSpecificOptions from './PathSpecificOptions';
import NodeDefinition from './NodeDefinition';
import NodeCalculations from './NodeCalculations';
import NodeLogic from './NodeLogic';
import ThingsDashboard from './components/ThingsDashboard';

export interface PinnedNode {
  id: string;
  name: string;
  fullPath: string;
  createdAt: Date;
  parentFolderId: string;
  attributes?: {
    CreateTime: string;
    User: string;
    AccessLevel: string;
    nodeDefinition?: Record<string, string>;
    assignedTraits?: Record<string, any>;
    [key: string]: any;
  };
}

interface CreateNewNodeProps {
  hierarchy: any[];
  onNodeCreated?: (
    name: string,
    fileId: string,
    parentFolderId: string,
    fullPath: string,
    pinnedNode: PinnedNode
  ) => void;
  pinnedNodes?: PinnedNode[];
  onPinnedNodesUpdate?: (nodes: PinnedNode[]) => void;
  virtualizedPhysicalObjects?: PinnedNode[];
  onVirtualizedPhysicalObjectsUpdate?: (nodes: PinnedNode[]) => void;
  definedActions?: PinnedNode[];
  onDefinedActionsUpdate?: (nodes: PinnedNode[]) => void;
  getLiveIdFromSelection?: (selectionPath: string) => string | null;
  onDeleteFromHierarchy?: (fileId: string) => void;
  selectedNodeId?: string | null;
  pathSpecificOptionNodes?: Record<string, string[]>;
}

const CreateNewNode: React.FC<CreateNewNodeProps> = ({
  onNodeCreated,
  pinnedNodes = [],
  onPinnedNodesUpdate,
  virtualizedPhysicalObjects = [],
  onVirtualizedPhysicalObjectsUpdate,
  definedActions = [],
  onDefinedActionsUpdate,
  getLiveIdFromSelection,
  hierarchy,
  selectedNodeId,
  pathSpecificOptionNodes = {},
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [objectName, setObjectName] = useState('');
  const [objectType, setObjectType] = useState<'Physical' | 'Abstract Thing' | ''>('');
  const [currentNode, setCurrentNode] = useState<JsonNode | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedPinnedNode, setSelectedPinnedNode] = useState<PinnedNode | null>(null);
  const [pathOptions, setPathOptions] = useState<Record<string, any>>({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [nodeToDelete, setNodeToDelete] = useState<PinnedNode | null>(null);
  const [thingCreated, setThingCreated] = useState(false);

  const [physicalNode, setPhysicalNode] = useState<JsonNode | undefined>();
  const [abstractNode, setAbstractNode] = useState<JsonNode | undefined>();
  const [isLoadingRoots, setIsLoadingRoots] = useState(true);

  const [hierarchySearchQuery, setHierarchySearchQuery] = useState('');

  const buildFullPath = (node: JsonNode | null): string => {
    if (!node) return '';
    const parts: string[] = [];
    let current: JsonNode | undefined = node;
    while (current) {
      parts.unshift(current.name);
      current = current.parent;
    }
    return parts.join(' to ');
  };

  const hierarchySearchResults = React.useMemo(() => {
    if (!hierarchySearchQuery.trim()) return [];

    const q = hierarchySearchQuery.trim().toLowerCase();
    const results: JsonNode[] = [];

    const traverse = (node: JsonNode | undefined) => {
      if (!node) return;

      if (node.name.toLowerCase().includes(q)) {
        results.push(node);
      }

      const path = buildFullPath(node).toLowerCase();
      if (path.includes(q)) {
        results.push(node);
      }

      node.children?.forEach(traverse);
    };

    traverse(physicalNode);
    traverse(abstractNode);

    return results.slice(0, 20);
  }, [hierarchySearchQuery, physicalNode, abstractNode]);

  const importFileRef = useRef<HTMLInputElement>(null);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  useEffect(() => {
    let mounted = true;
    getRootNodes().then(({ physicalNode: phys, abstractNode: abs }) => {
      if (mounted) {
        setPhysicalNode(phys);
        setAbstractNode(abs);
        setIsLoadingRoots(false);
      }
    }).catch(() => {
      if (mounted) setIsLoadingRoots(false);
    });
    return () => { mounted = false; };
  }, []);

  const isNodeInHierarchy = (fileId: string, hierarchy: any[]): boolean => {
    const search = (nodes: any[]): boolean => {
      for (const node of nodes) {
        if (node.id === fileId) return true;
        if (node.children && search(node.children)) return true;
      }
      return false;
    };
    return search(hierarchy);
  };

  useEffect(() => {
    if (!isLoadingRoots) {
      if (objectType === 'Physical') {
        setCurrentNode(physicalNode ?? null);
      } else if (objectType === 'Abstract Thing') {
        setCurrentNode(abstractNode ?? null);
      } else {
        setCurrentNode(null);
      }
    }
  }, [objectType, physicalNode, abstractNode, isLoadingRoots]);

  const resetForm = () => {
    setObjectName('');
    setObjectType('');
    setCurrentNode(null);
    setPathOptions({});
    setThingCreated(false);
    setHierarchySearchQuery('');
  };

  const toggleForm = () => {
    setIsFormOpen(v => !v);
    if (!isFormOpen) resetForm();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setObjectName(e.target.value);
  };

  const handleTypeChange = (type: 'Physical' | 'Abstract Thing') => {
    setObjectType(type);
  };

  const handleChipClick = (child: JsonNode) => {
    setCurrentNode(child);
    setPathOptions({});
  };

  const formNodeId =
    currentNode?.id === '1' ? '1.0' :
    currentNode?.id === '2' ? '2.0' :
    currentNode?.id ||
    (objectType === 'Physical' ? '1.0' :
     objectType === 'Abstract Thing' ? '2.0' : '');

  const getNextCreatedId = (parentFolderId: string): string => {
    const allNodes = [
      ...pinnedNodes,
      ...virtualizedPhysicalObjects,
      ...definedActions
    ];

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

  const handleCreate = async () => {
    if (!objectName.trim() || !objectType) return;

    const selectedNode = currentNode || (objectType === 'Physical' ? physicalNode : abstractNode);
    const fullPath = buildFullPath(selectedNode);
    const parentFolderId = getLiveIdFromSelection?.(fullPath) ?? selectedNode?.id ?? '';

    if (!parentFolderId) {
      showSnackbar('Could not map selection. Check folder names.', 'error');
      return;
    }

    const fileId = getNextCreatedId(parentFolderId);

    const now = new Date();

    const nodeDefinition = pathOptions.nodeDefinition || {};
    const assignedTraits = pathOptions.assignedTraits || {};

    const actionNodeFlag = pathOptions._actionNode;
    let actionName: string | undefined;

    if (actionNodeFlag?.isActionNode && currentNode) {
      actionName = currentNode.name;
    } else if (actionNodeFlag?.actionName) {
      actionName = actionNodeFlag.actionName;
    }

    const calculationNodeFlag = pathOptions._calculationNode;
    let calculationName: string | undefined;

    if (calculationNodeFlag?.isCalculationNode && currentNode) {
      calculationName = currentNode.name;
    } else if (calculationNodeFlag?.calculationName) {
      calculationName = calculationNodeFlag.calculationName;
    }

    const logicNodeFlag = pathOptions._logicNode;
    let logicName: string | undefined;

    if (logicNodeFlag?.isLogicNode && currentNode) {
      logicName = currentNode.name;
    } else if (logicNodeFlag?.logicName) {
      logicName = logicNodeFlag.logicName;
    }

    const newPinned: PinnedNode = {
      id: fileId,
      name: objectName.trim(),
      fullPath,
      createdAt: now,
      parentFolderId,
      attributes: {
        CreateTime: now.toISOString(),
        User: 'Admin',
        AccessLevel: 'Full',
        ...(Object.keys(nodeDefinition).length > 0 && { nodeDefinition }),
        ...(Object.keys(assignedTraits).length > 0 && { assignedTraits }),
        ...(actionName && {
          isActionNode: true,
          actionName,
        }),
        ...(calculationName && {
          nodecalculation: {
            isCalculationNode: true,
            calculationName,
          },
        }),
        ...(logicName && {
          isLogicNode: true,
          logicName,
        }),
      },
    };

    onPinnedNodesUpdate?.([...pinnedNodes, newPinned]);

    if (parentFolderId.startsWith('1.')) {
      onVirtualizedPhysicalObjectsUpdate?.([...virtualizedPhysicalObjects, newPinned]);
    } else if (parentFolderId.startsWith('2.')) {
      onDefinedActionsUpdate?.([...definedActions, newPinned]);
    }

    onNodeCreated?.(objectName.trim(), fileId, parentFolderId, fullPath, newPinned);

    setThingCreated(true);
    setObjectName('');
    setObjectType('');
    setCurrentNode(null);
    setPathOptions({});

    setTimeout(() => setThingCreated(false), 2000);
  };

  const openMenu = (e: React.MouseEvent<HTMLElement>) => setMenuAnchor(e.currentTarget);
  const closeMenu = () => setMenuAnchor(null);

  const findNodeById = (id: string, node: JsonNode | undefined): JsonNode | null => {
    if (!node) return null;
    if (node.id === id) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = findNodeById(id, child);
        if (found) return found;
      }
    }
    return null;
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      if (!data.name || !data.hierarchyId) {
        showSnackbar('Invalid file: missing "name" or "hierarchyId"', 'error');
        e.target.value = '';
        return;
      }

      const name = data.name.trim();
      const hierarchyId = data.hierarchyId;

      let targetRoot: JsonNode | undefined;
      if (hierarchyId.startsWith('1.')) {
        setObjectType('Physical');
        targetRoot = physicalNode;
      } else if (hierarchyId.startsWith('2.')) {
        setObjectType('Abstract Thing');
        targetRoot = abstractNode;
      } else {
        showSnackbar('Unsupported hierarchyId: must start with 1. or 2.', 'error');
        e.target.value = '';
        return;
      }

      const targetNode = findNodeById(hierarchyId, targetRoot) || targetRoot;

      setObjectName(name);
      setCurrentNode(targetNode);

      if (data.pathOptions) {
        setPathOptions(data.pathOptions);
      }

      e.target.value = '';

      const parentFolderIdFromImport = hierarchyId;
      let nodeActionName: string | undefined;
      if (parentFolderIdFromImport.startsWith('2.1.9.')) {
        const parts = parentFolderIdFromImport.split('.');
        nodeActionName = parts[parts.length - 1]?.split('_')[0];
      }

      if (nodeActionName) {
        setPathOptions(prev => ({
          ...prev,
          nodeAction: nodeActionName,
        }));
      }

      setTimeout(() => handleCreate(), 150);

      showSnackbar(
        `Imported and created: "${name}" at ${hierarchyId}` +
          (nodeActionName ? ` → Action: ${nodeActionName}` : ''),
        'success'
      );
    } catch (err) {
      console.error('Import failed:', err);
      showSnackbar('Failed to import JSON. Check format and console.', 'error');
      e.target.value = '';
    }
  };

  const handleTrashClick = (node: PinnedNode) => (e: React.MouseEvent) => {
    e.stopPropagation();
    const existsInHierarchy = isNodeInHierarchy(node.id, hierarchy);
    if (existsInHierarchy) {
      setNodeToDelete(node);
      setConfirmOpen(true);
    } else {
      const updateList = (list: PinnedNode[]) => list.filter(n => n.id !== node.id);
      if (virtualizedPhysicalObjects.some(n => n.id === node.id)) {
        onVirtualizedPhysicalObjectsUpdate?.(updateList(virtualizedPhysicalObjects));
      } else if (definedActions.some(n => n.id === node.id)) {
        onDefinedActionsUpdate?.(updateList(definedActions));
      } else {
        onPinnedNodesUpdate?.(updateList(pinnedNodes));
      }
      if (selectedPinnedNode?.id === node.id) setSelectedPinnedNode(null);
    }
  };

  const handleConfirmProceed = () => {
    if (!nodeToDelete) return;
    const updateList = (list: PinnedNode[]) => list.filter(n => n.id !== nodeToDelete.id);
    if (virtualizedPhysicalObjects.some(n => n.id === nodeToDelete.id)) {
      onVirtualizedPhysicalObjectsUpdate?.(updateList(virtualizedPhysicalObjects));
    } else if (definedActions.some(n => n.id === nodeToDelete.id)) {
      onDefinedActionsUpdate?.(updateList(definedActions));
    } else {
      onPinnedNodesUpdate?.(updateList(pinnedNodes));
    }
    if (selectedPinnedNode?.id === nodeToDelete.id) setSelectedPinnedNode(null);
    setConfirmOpen(false);
    setNodeToDelete(null);
  };

  const handleConfirmCancel = () => {
    setConfirmOpen(false);
    setNodeToDelete(null);
  };

  const renderCurrentLevel = () => {
    if (!currentNode || isLoadingRoots) {
      return <Typography sx={{ color: 'text.secondary', fontStyle: 'italic', mt: 2 }}>Loading hierarchy...</Typography>;
    }
    return (
      <Box sx={{ mt: 2, pl: 1 }}>
        <Typography sx={{ mb: 0.5, color: 'text.secondary', fontSize: '0.75rem', fontWeight: 500 }}>
          {currentNode.parent ? currentNode.name : 'Select subcategory'}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
          {currentNode.children
            .filter(child => child.id !== currentNode?.id)
            .map(child => (
              <Chip
                key={child.id}
                label={child.name}
                clickable
                size="small"
                onClick={() => handleChipClick(child)}
                sx={{
                  fontSize: '0.75rem',
                  height: 28,
                  bgcolor: 'transparent',
                  color: '#00A4EF',
                  border: '1.5px solid #00A4EF',
                  '&:hover': { bgcolor: 'rgba(0, 164, 239, 0.1)' },
                }}
              />
            ))}
        </Box>
      </Box>
    );
  };

  const renderBreadcrumb = () => {
    if (!currentNode || isLoadingRoots) return null;
    const path = buildFullPath(currentNode).split(' to ');
    return (
      <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0.5 }}>
        {path.map((name, i) => {
          const nodeAtLevel = getNodeAtPath(i);
          return (
            <React.Fragment key={i}>
              {i > 0 && <Typography sx={{ mx: 0.5, color: 'text.secondary' }}>to</Typography>}
              <Chip
                label={name}
                size="small"
                clickable={i < path.length - 1}
                onClick={() => nodeAtLevel && setCurrentNode(nodeAtLevel)}
                sx={{
                  fontSize: '0.75rem',
                  height: 24,
                  bgcolor: i === path.length - 1 ? '#00A4EF' : 'transparent',
                  color: i === path.length - 1 ? 'white' : '#00A4EF',
                  border: `1px solid ${i === path.length - 1 ? 'transparent' : '#00A4EF'}`,
                }}
              />
            </React.Fragment>
          );
        })}
      </Box>
    );
  };

  const getNodeAtPath = (depth: number): JsonNode | null => {
    if (!currentNode) return null;
    let node: JsonNode | undefined = currentNode;
    for (let i = 0; i < depth; i++) {
      if (!node?.parent) return null;
      node = node.parent;
    }
    return node || null;
  };

  const renderLiveNameAndPath = () => {
    const name = objectName ?? '';
    if (!name.trim() && !currentNode && !objectType) return null;

    const displayNode = currentNode || (objectType === 'Physical' ? physicalNode : abstractNode);
    if (!displayNode || isLoadingRoots) return null;

    const fullPath = buildFullPath(displayNode);

    return (
      <Box sx={{ mt: 2, mb: 3, p: 1, textAlign: 'left' }}>
        {name && (
          <Typography variant="h6" fontWeight={400} color="primary" sx={{ mb: 0.5 }}>
            {name}
          </Typography>
        )}
        {fullPath && (
          <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
            {fullPath}
          </Typography>
        )}
      </Box>
    );
  };

  const getCurrentParentFolderId = (): string => {
    if (!currentNode && objectType === 'Physical') return physicalNode?.id || '';
    if (!currentNode && objectType === 'Abstract Thing') return abstractNode?.id || '';
    return currentNode?.id || '';
  };

  const currentParentFolderId = getCurrentParentFolderId();

  const handleNodeRoleUpdate = useCallback((data: { nodeDefinition: Record<string, string> }) => {
    if (data.nodeDefinition) {
      setPathOptions(prev => ({
        ...prev,
        nodeDefinition: { ...prev.nodeDefinition, ...data.nodeDefinition },
      }));
    }
  }, []);

  const handleActionDetected = useCallback((flag: any) => {
    setPathOptions(prev => ({
      ...prev,
      _actionNode: flag
    }));
  }, []);

  const handleCalculationDetected = useCallback((flag: any) => {
    setPathOptions(prev => ({
      ...prev,
      _calculationNode: flag
    }));
  }, []);

  const handleLogicDetected = useCallback((flag: any) => {
    setPathOptions(prev => ({
      ...prev,
      _logicNode: flag
    }));
  }, []);

  const handlePathSpecificUpdate = useCallback((data: any) => {
    if (data.assignedTraits) {
      setPathOptions(prev => ({
        ...prev,
        assignedTraits: { ...prev.assignedTraits, ...data.assignedTraits },
      }));
    } else {
      setPathOptions(prev => ({
        ...prev,
        [formNodeId]: { ...(prev[formNodeId] || {}), ...data },
      }));
    }
  }, [formNodeId]);

  return (
    <>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 2 }}>
        <Button
          variant="contained"
          size="small"
          onClick={toggleForm}
          startIcon={isFormOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          disabled={isLoadingRoots}
          sx={{
            mt: 1,
            textTransform: 'none',
            fontWeight: 500,
            bgcolor: '#00A4EF',
            color: 'white',
            '&:hover': { bgcolor: '#0088cc' },
          }}
        >
          {isLoadingRoots ? 'Loading...' : 'Create New Thing'}
        </Button>
      </Box>

      <Collapse in={isFormOpen} timeout="auto" unmountOnExit>
        <Box sx={{ p: 3, mb: 3, borderRadius: '8px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>Define Something</Typography>
            <IconButton size="small" onClick={openMenu}><MoreVertIcon /></IconButton>
          </Box>

          <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}>
            <MenuItem onClick={() => { closeMenu(); importFileRef.current?.click(); }}>
              Import Something
            </MenuItem>
          </Menu>

          <input
            type="file"
            accept=".json,application/json"
            ref={importFileRef}
            style={{ display: 'none' }}
            onChange={handleImport}
          />

          <TextField
            label="Give it a name"
            variant="outlined"
            value={objectName}
            onChange={handleNameChange}
            size="medium"
            fullWidth
            autoFocus
            InputLabelProps={{ shrink: !!objectName }}
            sx={{
              mt: 2,
              '& .MuiOutlinedInput-root': {
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#222222',
                borderRadius: '16px',
                '& fieldset': {
                  borderWidth: '2px',
                  borderColor: '#222',
                  borderRadius: '16px',
                },
                '&:hover fieldset': {
                  borderColor: '#00A4EF',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00A4EF',
                },
              },
              '& .MuiOutlinedInput-input': {
                padding: '12px 18px',
              },
              '& .MuiInputLabel-root': {
                fontWeight: 500,
                color: '#222222',
                '&.Mui-focused': {
                  color: '#222222',
                },
              },
            }}
          />

          {renderLiveNameAndPath()}

          {/* NEW LAYOUT: Type chips + Quick search bar side-by-side */}
          <Box sx={{ mt: 3, display: 'flex', alignItems: 'flex-end', gap: 3, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
              <Typography sx={{ fontWeight: 500, color: 'text.primary', whiteSpace: 'nowrap' }}>
                Thing Type:
              </Typography>
              <Chip
                label="Virtualized Physical Thing"
                clickable
                onClick={() => handleTypeChange('Physical')}
                sx={{
                  bgcolor: objectType === 'Physical' ? '#00A4EF' : 'transparent',
                  color: objectType === 'Physical' ? 'white' : '#00A4EF',
                  border: `1px solid ${objectType === 'Physical' ? 'transparent' : '#00A4EF'}`,
                  '&:hover': { bgcolor: objectType === 'Physical' ? '#0088cc' : 'rgba(0, 164, 239, 0.1)' },
                }}
              />
              <Chip
                label="Abstract Thing"
                clickable
                onClick={() => handleTypeChange('Abstract Thing')}
                sx={{
                  bgcolor: objectType === 'Abstract Thing' ? '#00A4EF' : 'transparent',
                  color: objectType === 'Abstract Thing' ? 'white' : '#00A4EF',
                  border: `1px solid ${objectType === 'Abstract Thing' ? 'transparent' : '#00A4EF'}`,
                  '&:hover': { bgcolor: objectType === 'Abstract Thing' ? '#0088cc' : 'rgba(0, 164, 239, 0.1)' },
                }}
              />
            </Box>

            <Box sx={{ flexGrow: 1, minWidth: 320, position: 'relative' }}>
              <TextField
                label="Quick search hierarchy categories..."
                placeholder="Search by name or full path"
                size="medium"
                fullWidth
                value={hierarchySearchQuery}
                onChange={(e) => setHierarchySearchQuery(e.target.value)}
                sx={{
                  '& .MuiInputLabel-root': { fontWeight: 500 },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    bgcolor: 'background.default',
                    '& fieldset': { borderWidth: '2px' },
                  },
                }}
              />

              {hierarchySearchQuery && (
                <Paper
                  elevation={10}
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    maxHeight: '400px',
                    overflowY: 'auto',
                    zIndex: 30,
                    mt: 0.5,
                    borderRadius: '0 0 12px 12px',
                    border: '2px solid #00A4EF',
                    borderTop: 'none',
                  }}
                >
                  {hierarchySearchResults.length === 0 ? (
                    <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary', fontStyle: 'italic' }}>
                      No categories found
                    </Box>
                  ) : (
                    hierarchySearchResults.map((node) => (
                      <Box
                        key={node.id}
                        onClick={() => {
                          setCurrentNode(node);
                          const nodeId = (node.id || '').trim();
                          if (nodeId.startsWith('1')) setObjectType('Physical');
                          else if (nodeId.startsWith('2')) setObjectType('Abstract Thing');
                          setHierarchySearchQuery('');
                        }}
                        sx={{
                          p: 2,
                          borderBottom: '1px solid',
                          borderColor: 'divider',
                          cursor: 'pointer',
                          '&:hover': { bgcolor: 'action.hover' },
                          '&:last-child': { borderBottom: 'none' },
                        }}
                      >
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {node.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {buildFullPath(node)}
                        </Typography>
                      </Box>
                    ))
                  )}
                </Paper>
              )}
            </Box>
          </Box>

          {/* Fallback manual navigation */}
          {currentNode && (
            <Box sx={{ mt: 4, opacity: 0.85 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                Or browse manually:
              </Typography>
              {renderBreadcrumb()}
              {renderCurrentLevel()}
            </Box>
          )}

          {(currentNode || objectType) && (
            <NodeDefinition
              parentFolderId={currentParentFolderId}
              onUpdate={handleNodeRoleUpdate}
              pathOptions={pathOptions || {}}
              createdThings={pinnedNodes}
            />
          )}

          {(currentNode || objectType) && (
            <Box sx={{ mt: 3, p: 2, border: '1px dashed #ccc', borderRadius: '8px', bgcolor: '#f9f9f9', minHeight: 60 }}>
              <PathSpecificOptions
                currentNodeId={formNodeId}
                pinnedNodes={pinnedNodes}
                pathOptions={pathOptions || {}}
                onUpdate={handlePathSpecificUpdate}
              />
            </Box>
          )}

          {(currentNode || objectType) && (
            <NodeActions
              key={currentParentFolderId}
              parentFolderId={currentParentFolderId}
              onActionDetected={handleActionDetected}
            />
          )}

          {(currentNode || objectType) && (
            <NodeCalculations
              key={currentParentFolderId}
              parentFolderId={currentParentFolderId}
              onCalculationDetected={handleCalculationDetected}
            />
          )}

          {(currentNode || objectType) && (
            <NodeLogic
              key={currentParentFolderId}
              parentFolderId={currentParentFolderId}
              onLogicDetected={handleLogicDetected}
            />
          )}

          {thingCreated && (
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Chip label="Thing Created" color="primary" size="small" sx={{ fontWeight: 500 }} />
            </Box>
          )}

          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button variant="outlined" size="small" onClick={toggleForm} sx={{ textTransform: 'none', borderColor: '#00A4EF', color: 'text.primary' }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleCreate}
              disabled={!objectName.trim() || !objectType}
              sx={{ textTransform: 'none' }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Collapse>

      <ThingsDashboard
        pinnedNodes={pinnedNodes}
        virtualizedPhysicalObjects={virtualizedPhysicalObjects}
        definedActions={definedActions}
        selectedPinnedNode={selectedPinnedNode}
        onSelectNode={setSelectedPinnedNode}
        onDeleteNode={handleTrashClick}
      />

      <Dialog open={confirmOpen} onClose={handleConfirmCancel}>
        <DialogTitle>Caution</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are deleting a thing that you deployed to the hierarchy. Proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmCancel} color="inherit">Cancel</Button>
          <Button onClick={handleConfirmProceed} color="error" variant="contained" autoFocus>Proceed</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateNewNode;