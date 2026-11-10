'use client';

import React, { useEffect, useState, useMemo } from 'react';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CreatePageSimple from '@create/core/CreatePageSimple/CreatePageSimple';
import HierarchyDeveloperAppHeader from './EnvironmentDeveloperAppHeader';
import ExecutionConsole from './ExecutionConsole';
import CreateNewNode from './CreateNewNode';
import SequenceBuilder from './SequenceBuilder';
import NodeSearch from './components/NodeSearch';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  HierarchyNode,
  findNodeById,
  getFullPath,
} from './environmentTypes';
import { useEnvironment, PinnedNode } from './hooks/useEnvironment';
import pathSpecificOptionNodes from './src/data/pathSpecificOptionNodes.json';
import SetNodeActions from './SetNodeActions';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const deepClonePreserveMetadata = (obj: any): any => {
  if (typeof structuredClone !== 'undefined') return structuredClone(obj);
  return JSON.parse(JSON.stringify(obj));
};

const isUnderPath = (nodeId: string, basePath: string): boolean => {
  return nodeId.startsWith(`created_${basePath}`);
};

export default function EnvironmentDeveloperApp() {
  const {
    activeEnvironment,
    updateHierarchy,
    updatePinnedNodes,
    updateVirtualizedPhysicalObjects,
    updateDefinedActions,
    updateActionLog,
  } = useEnvironment();

  const [defaultHierarchy, setDefaultHierarchy] = useState<HierarchyNode[]>([]);

  const displayHierarchy = activeEnvironment?.hierarchy?.length > 0 
    ? activeEnvironment.hierarchy 
    : defaultHierarchy;

  // ← NEW: Added to receive staged sequences from SequenceBuilder
  const [stagedSequences, setStagedSequences] = useState<any[][]>([]);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [actionStagingContent, setActionStagingContent] = useState<string | null>(null);
  const [creationStatus, setCreationStatus] = useState<Map<string, 'success' | 'error' | null>>(new Map());
  const [virtualizedPhysicalObjects, setVirtualizedPhysicalObjects] = useState<PinnedNode[]>([]);
  const [definedActions, setDefinedActions] = useState<PinnedNode[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [pathSpecificNodes, setPathSpecificNodes] = useState<Record<string, string[]>>({});
  const [adminAction, setAdminAction] = useState<'apply' | 'associate' | 'attributes' | null>('apply');
  const [selectedTraitId, setSelectedTraitId] = useState<string>('');
  const [selectedOptionId, setSelectedOptionId] = useState<string>('');
  const [selectedIndices, setSelectedIndices] = useState(new Set<number>());
  const [activeSequenceIndex, setActiveSequenceIndex] = useState<number | null>(null);
  const [nodeActions, setNodeActions] = useState<Map<string, Array<{ action: string; setting?: string }>>>(new Map());

  // Pending edits for the value field
  const [pendingAttributes, setPendingAttributes] = useState<Record<string, any>>({});
  const [nodeValuesMenuAnchor, setNodeValuesMenuAnchor] = useState<null | HTMLElement>(null);
  useEffect(() => setPathSpecificNodes(pathSpecificOptionNodes), []);

  useEffect(() => {
    setVirtualizedPhysicalObjects(activeEnvironment?.virtualizedPhysicalObjects ?? []);
    setDefinedActions(activeEnvironment?.definedActions ?? []);
  }, [activeEnvironment?.virtualizedPhysicalObjects, activeEnvironment?.definedActions]);

  // Get the actual pinned node for editing
  const selectedPinnedNode = useMemo(() => {
    if (!selectedNodeId || !activeEnvironment?.pinnedNodes) return null;
    return activeEnvironment.pinnedNodes.find(n => n.id === selectedNodeId) || null;
  }, [selectedNodeId, activeEnvironment?.pinnedNodes]);

  const selectedNode = useMemo((): HierarchyNode | null => {
    if (!selectedNodeId) return null;

    const fromTree = findNodeById(selectedNodeId, displayHierarchy);
    if (fromTree) return fromTree;

    if (selectedPinnedNode) {
      return {
        id: selectedPinnedNode.id,
        name: selectedPinnedNode.name,
        isFolder: false,
        children: [],
        assignedAction: 'No Action Assigned',
        metadata: {
          source: 'CreateNewNode',
          parentFolderId: selectedPinnedNode.parentFolderId,
          fullPath: selectedPinnedNode.fullPath,
          attributes: selectedPinnedNode.attributes ?? null,
          pathOptions: selectedPinnedNode.pathOptions ?? null,
        },
      } as HierarchyNode;
    }

    return null;
  }, [selectedNodeId, displayHierarchy, selectedPinnedNode]);

  const consoleOutput = Array.isArray(activeEnvironment?.actionLog) ? activeEnvironment.actionLog : [];

  const instancesInFolder = useMemo(() => {
    if (!selectedNode?.isFolder) return [];

    const folderId = selectedNode.id;

    const allCreatedThings = [
      ...(activeEnvironment?.pinnedNodes ?? []),
      ...virtualizedPhysicalObjects,
      ...definedActions,
    ];

    return allCreatedThings.filter((node) => node.parentFolderId === folderId);
  }, [
    selectedNode,
    activeEnvironment?.pinnedNodes,
    virtualizedPhysicalObjects,
    definedActions,
  ]);

  const handleNodeSelect = (nodeId: string | null) => {
    setSelectedNodeId(nodeId);
    setPendingAttributes({}); // Clear pending when selecting new node
    setAdminAction('apply');
    setSuccessMessage(null);
    setSelectedTraitId('');
    setSelectedOptionId('');
    setSelectedIndices(new Set<number>());
    setActiveSequenceIndex(null);
  };

  const handleActionAdded = (nodeId: string, action: string, setting?: string) => {
    setNodeActions((prev) => {
      const updated = new Map(prev);
      const current = updated.get(nodeId) || [];
      const existingIndex = current.findIndex((a) => a.action === action);
      if (existingIndex >= 0) {
        current[existingIndex] = { action, setting: setting || '' };
      } else {
        current.push({ action, setting: setting || '' });
      }
      updated.set(nodeId, current);
      return updated;
    });
  };

  const handleCreateFileInHierarchy = async (
    name: string,
    createdId: string,
    parentFolderId: string,
    fullPath: string,
    pinnedNode: PinnedNode
  ) => {
    if (!activeEnvironment) return;

    const parentNode = findNodeById(parentFolderId, displayHierarchy);
    if (!parentNode || parentNode.children?.some((c) => c.name === name.trim())) {
      setCreationStatus((prev) => new Map(prev).set(name, 'error'));
      return;
    }

    const newFile: HierarchyNode = {
      id: createdId,
      name: name.trim(),
      isFolder: false,
      children: [],
      assignedAction: 'No Action Assigned',
      metadata: {
        source: 'CreateNewNode',
        parentFolderId,
        fullPath,
        pathOptions: pinnedNode.pathOptions ?? null,
        attributes: pinnedNode.attributes ?? null,
      },
    };

    const newH = deepClonePreserveMetadata(displayHierarchy);
    const add = (nodes: HierarchyNode[]): boolean => {
      for (const n of nodes) {
        if (n.id === parentFolderId) {
          n.children = [...(n.children ?? []), newFile];
          return true;
        }
        if (n.children && add(n.children)) return true;
      }
      return false;
    };
    add(newH);
    updateHierarchy(newH);
    setSelectedNodeId(createdId);

    const currentPinned = activeEnvironment.pinnedNodes ?? [];
    const exists = currentPinned.some((p) => p.id === createdId);
    const updatedPinned = exists
      ? currentPinned.map((p) => (p.id === createdId ? pinnedNode : p))
      : [...currentPinned, pinnedNode];

    updatePinnedNodes(updatedPinned);

    try {
      const res = await fetch('/api/create-hierarchy-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, hierarchyId: parentFolderId, fullPath, pathOptions: pinnedNode.pathOptions }),
      });
      setCreationStatus((prev) => new Map(prev).set(name, res.ok ? 'success' : 'error'));
    } catch {
      setCreationStatus((prev) => new Map(prev).set(name, 'error'));
    }
  };

  const handleDeleteFromHierarchy = (createdId: string) => {
    if (!activeEnvironment) return;
    updateHierarchy(deleteNode(createdId, displayHierarchy));
    const pinned = Array.isArray(activeEnvironment.pinnedNodes) ? activeEnvironment.pinnedNodes : [];
    updatePinnedNodes(pinned.filter((n) => n.id !== createdId));
  };

  const { TRAIT_REGISTRY } = require('./traitRegistry');

  const eligibleTraits = useMemo(() => {
    if (!selectedNode?.isFolder) return [];
    const pinned = activeEnvironment?.pinnedNodes;
    if (!pinned || !Array.isArray(pinned)) return [];
    return TRAIT_REGISTRY.filter((trait: any) => {
      if (!trait.appliesTo.includes(selectedNode.id)) return false;
      return pinned.some(
        (node: any) => typeof node.id === 'string' && node.id.startsWith(`created_${trait.pathPrefix}`)
      );
    });
  }, [selectedNode, activeEnvironment?.pinnedNodes]);

  const traitOptions = useMemo(() => {
    if (!selectedTraitId) return [];
    const trait = TRAIT_REGISTRY.find((t: any) => t.id === selectedTraitId);
    if (!trait) return [];
    return (activeEnvironment?.pinnedNodes ?? []).filter(
      (node: any) => typeof node.id === 'string' && isUnderPath(node.id, trait.pathPrefix)
    );
  }, [selectedTraitId, activeEnvironment?.pinnedNodes]);

  const handleApplyTrait = () => {
    if (!selectedNode?.isFolder || !selectedTraitId || !selectedOptionId) return;
    const trait = TRAIT_REGISTRY.find((t: any) => t.id === selectedTraitId);
    const option = traitOptions.find((o: any) => o.id === selectedOptionId);
    if (!trait || !option) return;

    const newHierarchy = deepClonePreserveMetadata(displayHierarchy);
    let updatedCount = 0;
    const apply = (nodes: HierarchyNode[]) => {
      for (const node of nodes) {
        if (node.id.startsWith('created_') && node.metadata?.parentFolderId === selectedNode.id) {
          if (!node.metadata.attributes) node.metadata.attributes = {};
          node.metadata.attributes[trait.id] = { name: option.name, id: option.id };
          updatedCount++;
        }
        if (node.children) apply(node.children);
      }
    };
    apply(newHierarchy);
    updateHierarchy(newHierarchy);

    const pinned = Array.isArray(activeEnvironment.pinnedNodes) ? activeEnvironment.pinnedNodes : [];
    const updatedPinned = pinned.map((p) =>
      p.parentFolderId === selectedNode.id && p.attributes
        ? { ...p, attributes: { ...p.attributes, [trait.id]: { name: option.name, id: option.id } } }
        : p
    );
    updatePinnedNodes(updatedPinned);

    setSuccessMessage(`${trait.name} "${option.name}" applied to ${updatedCount} file(s)`);
    setSelectedTraitId('');
    setSelectedOptionId('');
  };

  // All created things (pinned nodes) sorted by creation date (newest first)
  const createdThings = useMemo(() => {
    return (activeEnvironment?.pinnedNodes ?? []).sort((a, b) => 
      new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
    );
  }, [activeEnvironment?.pinnedNodes]);

  // Collapsible Hierarchy List Component (hook-safe)
  const HierarchyCategoriesList: React.FC<{
  nodes: HierarchyNode[];
  selectedNodeId: string | null;
  onNodeSelect: (id: string) => void;
}> = ({ nodes, selectedNodeId, onNodeSelect }) => {
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set(['1', '2']));

  const toggleFolder = (nodeId: string) => {
    setOpenFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const renderNodes = (nodes: HierarchyNode[], depth = 0): React.ReactNode[] => {
    return nodes
      .filter((node) => node.isFolder)
      .map((node) => {
        const parts = node.id.split('.');
        const currentDepth = parts.length - 1;
        if (currentDepth > 3) return null;

        const hasChildren = node.children && node.children.length > 0;
        const isOpen = openFolders.has(node.id);

        return (
          <React.Fragment key={node.id}>
            <ListItemButton
              selected={selectedNodeId === node.id}
              onClick={() => {
                if (hasChildren) toggleFolder(node.id);
                onNodeSelect(node.id);
              }}
              sx={{
                pl: 2 + currentDepth * 2,
                py: 0.7,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {hasChildren && (
                <IconButton
                  size="small"
                  sx={{
                    mr: 0.5,
                    transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}
                >
                  <ChevronRightIcon fontSize="small" />
                </IconButton>
              )}
              {!hasChildren && <Box sx={{ width: 32 }} />}

              <ListItemText
                primary={node.name}
                primaryTypographyProps={{
                  fontWeight: selectedNodeId === node.id ? 600 : 400,
                  fontSize: '0.9rem',
                }}
              />
            </ListItemButton>

            {hasChildren && (
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <Box sx={{ pl: 2 }}>
                  <HierarchyCategoriesList
                    nodes={node.children!}
                    selectedNodeId={selectedNodeId}
                    onNodeSelect={onNodeSelect}
                  />
                </Box>
              </Collapse>
            )}
          </React.Fragment>
        );
      });
  };

  return <>{renderNodes(nodes)}</>;
};

  return (
    <CreatePageSimple
      header={<HierarchyDeveloperAppHeader />}
      content={
        <Box className="flex flex-col flex-1" sx={{ p: 2, height: '100%' }}>
          <CreateNewNode
            hierarchy={displayHierarchy}
            onNodeCreated={handleCreateFileInHierarchy}
            pinnedNodes={activeEnvironment?.pinnedNodes ?? []}
            onPinnedNodesUpdate={updatePinnedNodes}
            virtualizedPhysicalObjects={virtualizedPhysicalObjects}
            onVirtualizedPhysicalObjectsUpdate={updateVirtualizedPhysicalObjects}
            definedActions={definedActions}
            onDefinedActionsUpdate={updateDefinedActions}
            getLiveIdFromSelection={(selectionPath: string) => {
              const node = displayHierarchy.find((n) => {
                const path = getFullPath(n.id, displayHierarchy);
                return path?.endsWith(selectionPath);
              });
              return node?.id ?? null;
            }}
            creationStatus={creationStatus}
            onDeleteFromHierarchy={handleDeleteFromHierarchy}
            selectedNodeId={selectedNodeId}
            pathSpecificOptionNodes={pathSpecificNodes}
          />
          <Box sx={{ mb: 3 }} />

          <div className="flex flex-1 overflow-hidden" style={{ minHeight: 0 }}>
            {/* LEFT: Hierarchy Categories — with collapsible folders */}
            <Box
              sx={{
                width: '30%',
                minWidth: '300px',
                mr: 4,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <NodeSearch
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                nodes={activeEnvironment?.pinnedNodes ?? []}
                onNodeSelect={(nodeId) => setSelectedNodeId(nodeId)}
              />

              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
                Hierarchy Categories
              </Typography>

              <Box
                sx={{
                  flex: 1,
                  maxHeight: '60vh',
                  overflowY: 'auto',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '6px',
                  bgcolor: 'background.paper',
                  '&::-webkit-scrollbar': { width: '8px' },
                  '&::-webkit-scrollbar-track': { background: 'transparent' },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '4px',
                  },
                }}
              >
                <List dense>
                  {displayHierarchy.length === 0 ? (
                    <Typography sx={{ p: 2, color: 'text.secondary', fontStyle: 'italic' }}>
                      No hierarchy defined.
                    </Typography>
                  ) : (
                    <HierarchyCategoriesList
                      nodes={displayHierarchy}
                      selectedNodeId={selectedNodeId}
                      onNodeSelect={handleNodeSelect}
                    />
                  )}
                </List>
              </Box>
            </Box>

            {/* RIGHT: MAIN PANEL — with internal scrolling and fixed footer */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                background: 'transparent',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                color: '#e0e0e0',
                overflow: 'hidden',
                mb: 4,  // ← This adds space *outside* below the entire panel
              }}
            >
              {/* Scrollable content area */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: 'auto',
                  p: 4,
                  pb: 16,
                  '&::-webkit-scrollbar': { width: '8px' },
                  '&::-webkit-scrollbar-track': { background: 'transparent' },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '4px',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Box
                    sx={{
                      pl: 0,
                      pr: 2,
                      pt: 1,
                      pb: 1,
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      backdropFilter: 'blur(4px)',
                      display: 'inline-block',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 500, fontSize: '1.2rem', lineHeight: 1, color: '#222222' }}>
                      Hierarchy Editor
                    </Typography>
                  </Box>

                  {/* Three-Dots Menu */}
                  <IconButton
                    onClick={(e) => setNodeValuesMenuAnchor(e.currentTarget)}
                    sx={{ color: '#a0d8ef' }}
                  >
                    <MoreVertIcon />
                  </IconButton>

                  <Menu
                    anchorEl={nodeValuesMenuAnchor}
                    open={Boolean(nodeValuesMenuAnchor)}
                    onClose={() => setNodeValuesMenuAnchor(null)}
                    PaperProps={{
                      sx: {
                        bgcolor: 'rgba(15, 58, 71, 0.95)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(80, 200, 220, 0.4)',
                        mt: 1,
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        setNodeValuesMenuAnchor(null);
                        // Action for Available Operations (add your logic here)
                        console.log('Available Operations selected');
                      }}
                      sx={{ fontFamily: '"Roboto Mono", "Courier New", monospace', fontSize: '0.9rem' }}
                    >
                      Available Operations
                    </MenuItem>
                  </Menu>
                </Box>

                {/* Instances list — Florida ocean dark teal theme with console font */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1.5, color: '#000000ff' }}>
                    Existing Objects ({instancesInFolder.length})
                  </Typography>

                  {instancesInFolder.length > 0 ? (
                    <Box
                      sx={{
                        height: 240,
                        background: 'linear-gradient(135deg, #4050e0 0%, #169AFC 50%, #0080FF 100%)',
                        borderRadius: '12px',
                        border: '1px solid rgba(80, 180, 200, 0.4)',
                        boxShadow: '0 8px 32px rgba(10, 60, 80, 0.5)',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <List dense disablePadding sx={{ flex: 1, overflowY: 'auto', py: 0 }}>
                        {instancesInFolder.map((node) => (
                          <ListItemButton
                            key={node.id}
                            selected={selectedNodeId === node.id}
                            onClick={() => setSelectedNodeId(node.id)}
                            sx={{
                              py: 1.1,
                              borderBottom: '1px solid rgba(100, 200, 220, 0.15)',
                              '&:last-child': { borderBottom: 'none' },
                              transition: 'background 0.2s ease',
                              '&.Mui-selected': {
                                bgcolor: 'rgba(80, 200, 220, 0.4)',
                                '&:hover': { bgcolor: 'rgba(80, 200, 220, 0.4)' },
                              },
                              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.08)' },
                            }}
                          >
                            <ListItemText
                              primary={node.name}
                              secondary={
                                <>
                                  {node.parentFolderId.startsWith('1.') && 'Physical'}
                                  {node.parentFolderId.startsWith('2.1.9') && 'Action'}
                                  {node.parentFolderId.startsWith('2.2.') && 'Logic'}
                                  {node.parentFolderId.startsWith('2.1.1') && 'Number'}
                                  {!['1.', '2.1.9', '2.2.', '2.1.1'].some(p => node.parentFolderId.startsWith(p)) && 'Abstract'}
                                  {node.attributes?.assignedTraits?.location && (
                                    <span> • X:{node.attributes.assignedTraits.location.x.toFixed(1)} Y:{node.attributes.assignedTraits.location.y.toFixed(1)}</span>
                                  )}
                                </>
                              }
                              primaryTypographyProps={{
                                fontFamily: '"Roboto Mono", "Courier New", monospace',
                                fontWeight: 600,
                                fontSize: '0.95rem',
                                color: '#ffffff',
                                letterSpacing: '0.5px',
                              }}
                              secondaryTypographyProps={{
                                fontFamily: '"Roboto Mono", "Courier New", monospace',
                                fontSize: '0.78rem',
                                color: '#a0d8ef',
                                opacity: 0.95,
                                letterSpacing: '0.3px',
                              }}
                            />
                          </ListItemButton>
                        ))}
                      </List>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        height: 240,
                        background: 'linear-gradient(135deg, #4050e0 0%, #169AFC 80%)',
                        borderRadius: '12px',
                        border: '1px dashed rgba(80, 200, 220, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(10, 60, 80, 0.4)',
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: '"Roboto Mono", "Courier New", monospace',
                          color: '#88c8e0',
                          fontStyle: 'normal',
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          letterSpacing: '1px',
                        }}
                      >
                        No instances created here yet.
                      </Typography>
                    </Box>
                  )}
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1.5, color: '#222' }}>
                    Node Values
                  </Typography>

                  {/* Teal Node Values box with three-dots in top-right */}
                  <Box
                    sx={{
                      position: 'relative', // Needed for absolute positioning of the menu button
                      minHeight: 180,
                      background: 'linear-gradient(135deg, #4050e0 0%, #169AFC 80%)',
                      borderRadius: '12px',
                      border: '1px dashed rgba(80, 200, 220, 0.4)',
                      boxShadow: '0 4px 20px rgba(10, 60, 80, 0.4)',
                      p: 3,
                      pb: 4, // Extra bottom padding to prevent content overlap with menu
                      color: '#ffffff',
                      fontFamily: '"Roboto Mono", "Courier New", monospace',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      letterSpacing: '0.8px',
                      lineHeight: 1.8,
                      wordBreak: 'break-word',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Three-dots menu button positioned in top-right */}
                    <IconButton
                      onClick={(e) => setNodeValuesMenuAnchor(e.currentTarget)}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: '#a0f8ff',
                        bgcolor: 'rgba(0, 0, 0, 0.2)',
                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.4)' },
                        zIndex: 10,
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>

                    {}
                    {selectedPinnedNode ? (
                      <>
                        {selectedPinnedNode.name}
                        <br />
                        {selectedPinnedNode.fullPath || selectedPinnedNode.id}
                        <br />
                        <br />

                        {}
                        {selectedPinnedNode.attributes?.assignedTraits && (
                          <>
                            {Object.entries(selectedPinnedNode.attributes.assignedTraits)
                              .filter(([_, trait]) => trait !== null && trait !== undefined)
                              .map(([pathId, trait]: [string, any]) => {
                                const displayName =
                                  trait.display ||
                                  (trait.xName && trait.yName ? `${trait.xName} ↔ ${trait.yName}` : null) ||
                                  trait.name ||
                                  'Unnamed Trait';

                                return (
                                  <span key={pathId}>
                                    {displayName}
                                    <br />
                                  </span>
                                );
                              })}
                            <br />
                          </>
                        )}

                        {/* Editable values */}
                        {selectedPinnedNode.attributes &&
                          Object.entries(selectedPinnedNode.attributes)
                            .filter(([k]) => !['CreateTime', 'User', 'AccessLevel'].includes(k))
                            .map(([k, v]) => {
                              // 1. Editable literal value (e.g. nodeDefinition.value from Value_2_5)
                              if (typeof v === 'object' && v !== null && 'value' in v) {
                                return (
                                  <span key={k}>
                                    {k}:{' '}
                                    <input
                                      type="text"
                                      value={pendingAttributes[`${k}.value`] ?? v.value ?? ''}
                                      onChange={(e) => {
                                        setPendingAttributes((prev) => ({
                                          ...prev,
                                          [`${k}.value`]: e.target.value,
                                        }));
                                      }}
                                      style={{
                                        width: '160px',
                                        padding: '4px 8px',
                                        fontFamily: 'inherit',
                                        fontSize: '0.9rem',
                                        background: 'rgba(0, 0, 0, 0.4)',
                                        border: '1px solid rgba(80, 200, 220, 0.4)',
                                        borderRadius: '6px',
                                        color: '#ffffff',
                                        outline: 'none',
                                      }}
                                    />
                                    <br /><br />
                                  </span>
                                );
                              }

                              // 2. NEW: Editable Binary trait (X ↔ Y assignment)
                              if (k === 'assignedTraits' && typeof v === 'object' && v !== null) {
                                const allPinned = activeEnvironment?.pinnedNodes ?? [];

                                const xOptions = allPinned.filter(n => 
                                  n.id.startsWith('created_') && 
                                  n.id.match(/^created_(?:\d+_)*2\.1\.3\.1(?:\.|$)/)
                                );
                                const yOptions = allPinned.filter(n => 
                                  n.id.startsWith('created_') && 
                                  n.id.match(/^created_(?:\d+_)*2\.1\.3\.2(?:\.|$)/)
                                );

                                return Object.entries(v).map(([traitPath, trait]: [string, any]) => {
                                  if (trait && trait.xId && trait.yId) {
                                    const shortPath = traitPath.split('.').pop() || traitPath;

                                    return (
                                      <span key={traitPath}>
                                        <strong>Binary ({shortPath})</strong>:<br />
                                        Current: {trait.display || `${trait.xName} ↔ ${trait.yName}`}<br /><br />

                                        X (Active):{' '}
                                        <select
                                          value={pendingAttributes[`assignedTraits.${traitPath}.xId`] ?? trait.xId}
                                          onChange={(e) => {
                                            const newId = e.target.value;
                                            const newNode = allPinned.find(n => n.id === newId);
                                            setPendingAttributes(prev => ({
                                              ...prev,
                                              [`assignedTraits.${traitPath}.xId`]: newId,
                                              [`assignedTraits.${traitPath}.xName`]: newNode?.name || '',
                                            }));
                                          }}
                                          style={{
                                            width: '200px',
                                            padding: '4px 8px',
                                            fontFamily: 'inherit',
                                            fontSize: '0.9rem',
                                            background: 'rgba(0, 0, 0, 0.4)',
                                            border: '1px solid rgba(80, 200, 220, 0.4)',
                                            borderRadius: '6px',
                                            color: '#ffffff',
                                          }}
                                        >
                                          <option value="">None</option>
                                          {xOptions.map(opt => (
                                            <option key={opt.id} value={opt.id}>
                                              {opt.name} ({opt.id.replace(/^created_(?:\d+_)*/, '')})
                                            </option>
                                          ))}
                                        </select>
                                        <br /><br />

                                        Y (Passive):{' '}
                                        <select
                                          value={pendingAttributes[`assignedTraits.${traitPath}.yId`] ?? trait.yId}
                                          onChange={(e) => {
                                            const newId = e.target.value;
                                            const newNode = allPinned.find(n => n.id === newId);
                                            setPendingAttributes(prev => ({
                                              ...prev,
                                              [`assignedTraits.${traitPath}.yId`]: newId,
                                              [`assignedTraits.${traitPath}.yName`]: newNode?.name || '',
                                            }));
                                          }}
                                          style={{
                                            width: '200px',
                                            padding: '4px 8px',
                                            fontFamily: 'inherit',
                                            fontSize: '0.9rem',
                                            background: 'rgba(0, 0, 0, 0.4)',
                                            border: '1px solid rgba(80, 200, 220, 0.4)',
                                            borderRadius: '6px',
                                            color: '#ffffff',
                                          }}
                                        >
                                          <option value="">None</option>
                                          {yOptions.map(opt => (
                                            <option key={opt.id} value={opt.id}>
                                              {opt.name} ({opt.id.replace(/^created_(?:\d+_)*/, '')})
                                            </option>
                                          ))}
                                        </select>
                                        <br /><br />
                                      </span>
                                    );
                                  }
                                  return null;
                                });
                              }

                              // 3. Simple display for other named traits (Location, Color, etc.)
                              if (typeof v === 'object' && v !== null && v.name) {
                                return (
                                  <span key={k}>
                                    {v.name}
                                    <br /><br />
                                  </span>
                                );
                              }

                              return null;
                            })}

                        {/* Show "No traits generated" only when truly nothing is there */}
                        {(!selectedPinnedNode.attributes?.nodeDefinition &&
                          !selectedPinnedNode.attributes?.assignedTraits &&
                          selectedPinnedNode.attributes &&
                          Object.keys(selectedPinnedNode.attributes)
                            .filter(k => !['CreateTime', 'User', 'AccessLevel'].includes(k))
                            .length === 0) && 'No traits generated'}
                      </>
                    ) : (
                      <span style={{ opacity: 0.7, fontStyle: 'italic' }}>
                        No node selected — select a created thing from the list
                      </span>
                    )}
                  </Box>
                
                </Box>

                {/* SetNodeActions */}
                <Box sx={{ mb: 1 }}>
                  <Box sx={{ minHeight: '380px', borderRadius: '8px', p: 0 }}>
                    <SetNodeActions
                      selectedTreeNode={selectedNode}
                      selectedNodeId={selectedNodeId}
                      activeSequenceIndex={activeSequenceIndex}
                      consoleOutput={consoleOutput}
                      updateActionLog={updateActionLog}
                      onActionAdded={handleActionAdded}
                      selectedPinnedNode={selectedPinnedNode}
                      updatePinnedNodes={updatePinnedNodes}
                      successMessage={successMessage}
                      setSuccessMessage={setSuccessMessage}
                      activeEnvironment={activeEnvironment}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </div>

          {/* Extra breathing room before the bottom panels */}
          <Box sx={{ height: 24 }} />

          {/* ← SequenceBuilder with new prop */}
<SequenceBuilder
  consoleOutput={consoleOutput}
  updateActionLog={updateActionLog}
  setActionStagingContent={setActionStagingContent}
  selectedIndices={selectedIndices}
  setSelectedIndices={setSelectedIndices}
  activeSequenceIndex={activeSequenceIndex}
  setActiveSequenceIndex={setActiveSequenceIndex}
  pinnedNodes={activeEnvironment?.pinnedNodes ?? []}
  virtualizedPhysicalObjects={virtualizedPhysicalObjects}
  definedActions={definedActions}
  onStagedSequencesChange={setStagedSequences}  // ← ONLY THIS LINE ADDED
/>

           {/* ← ExecutionConsole with stagedSequences prop */}
          <ExecutionConsole
            content={actionStagingContent}
            onClear={() => setActionStagingContent(null)}
            consoleOutput={consoleOutput}
            updateActionLog={updateActionLog}
            setActionStagingContent={setActionStagingContent}
            onNewObjectsCreated={(updatedNodes) => {
              updatePinnedNodes((prev) => {
                const list = Array.isArray(prev) ? prev : [];
                const map = new Map(list.map((n) => [n.id, n]));
                updatedNodes.forEach((node) => map.set(node.id, node));
                return Array.from(map.values());
              });
            }}
            stagedSequences={stagedSequences}  
          />
        </Box>
      }
    />
  );
}