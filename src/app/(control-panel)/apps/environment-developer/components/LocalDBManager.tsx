'use client';

import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';

interface PinnedNode {
  id: string;
  name: string;
  fullPath: string;
  parentFolderId: string;
  createdAt: string;
  attributes?: {
    Age?: number;
    Location?: string;
    Profession?: string;
    assignedTraits?: Record<string, { name: string; value?: any; id?: string }>;
    nodeDefinition?: Record<string, string>;
    CreateTime?: string;
    User?: string;
    AccessLevel?: string;
    [key: string]: any;
  };
  pathOptions?: Record<string, any>;
  assignedTraits?: Record<string, { name: string; value?: any; id?: string }>; // legacy
}

interface Environment {
  id: string;
  name: string;
  hierarchy: any[];
  pinnedNodes: PinnedNode[];
  actionLog: any[];
  lastModified: string;
}

export default function LocalDBManager() {
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [editOpen, setEditOpen] = useState(false);
  const [editNode, setEditNode] = useState<PinnedNode | null>(null);
  const [form, setForm] = useState<Partial<PinnedNode>>({});
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState<string>('');

  // -------------------------------------------------
  // Load + Migrate legacy traits
  // -------------------------------------------------
  useEffect(() => {
    const raw = localStorage.getItem('hierarchy_environments');
    const active = localStorage.getItem('active_environment_id');
    if (raw) {
      let envs: Environment[] = JSON.parse(raw);
      let migrated = false;

      envs = envs.map(env => {
        const newNodes = env.pinnedNodes.map(node => {
          // Migrate root assignedTraits → attributes.assignedTraits
          if (node.assignedTraits && !node.attributes?.assignedTraits) {
            migrated = true;
            return {
              ...node,
              attributes: {
                ...node.attributes,
                assignedTraits: node.assignedTraits,
              },
              assignedTraits: undefined,
            };
          }
          return node;
        });
        return { ...env, pinnedNodes: newNodes };
      });

      if (migrated) {
        localStorage.setItem('hierarchy_environments', JSON.stringify(envs));
      }

      setEnvironments(envs);
      setActiveId(active ?? '');
    }
  }, []);

  const activeEnv = environments.find(e => e.id === activeId);

  // -------------------------------------------------
  // Search & Filter
  // -------------------------------------------------
  const filteredNodes = useMemo(() => {
    if (!activeEnv) return [];
    if (!searchTerm) return activeEnv.pinnedNodes;

    const lower = searchTerm.toLowerCase();
    return activeEnv.pinnedNodes.filter(node => {
      const rootTraits = node.attributes?.assignedTraits || node.assignedTraits || {};
      const pathTraits = node.pathOptions?.assignedTraits || {};

      return (
        node.name.toLowerCase().includes(lower) ||
        node.fullPath.toLowerCase().includes(lower) ||
        Object.values(rootTraits).some(t => t.name?.toLowerCase().includes(lower)) ||
        Object.values(pathTraits).some(t => t.name?.toLowerCase().includes(lower))
      );
    });
  }, [activeEnv, searchTerm]);

  // -------------------------------------------------
  // Early return
  // -------------------------------------------------
  if (!activeEnv) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No active environment.
        </Typography>
        <Button
          component={Link}
          href="/apps/environment-developer"
          variant="contained"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Return to Environment Developer
        </Button>
      </Box>
    );
  }

  // -------------------------------------------------
  // Selection Logic
  // -------------------------------------------------
  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredNodes.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredNodes.map(n => n.id)));
    }
  };

  const isAllSelected = selectedIds.size === filteredNodes.length && filteredNodes.length > 0;
  const isIndeterminate = selectedIds.size > 0 && selectedIds.size < filteredNodes.length;

  // -------------------------------------------------
  // Helpers
  // -------------------------------------------------
  const save = (updated: Environment[]) => {
    localStorage.setItem('hierarchy_environments', JSON.stringify(updated));
    setEnvironments(updated);
  };

  const deleteSelected = () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Delete ${selectedIds.size} selected node(s) permanently?`)) return;

    const updatedEnv = {
      ...activeEnv,
      pinnedNodes: activeEnv.pinnedNodes.filter(n => !selectedIds.has(n.id)),
      lastModified: new Date().toISOString(),
    };
    const newEnvs = environments.map(e => (e.id === activeId ? updatedEnv : e));
    save(newEnvs);
    setSelectedIds(new Set());
  };

  const deleteNode = (nodeId: string) => {
    if (!confirm('Delete this node permanently?')) return;
    const updatedEnv = {
      ...activeEnv,
      pinnedNodes: activeEnv.pinnedNodes.filter(n => n.id !== nodeId),
      lastModified: new Date().toISOString(),
    };
    const newEnvs = environments.map(e => (e.id === activeId ? updatedEnv : e));
    save(newEnvs);
  };

  const openEdit = (node: PinnedNode) => {
    setEditNode(node);
    setForm({ ...node });
    setEditOpen(true);
  };

  const saveEdit = () => {
    if (!editNode) return;
    const updatedEnv = {
      ...activeEnv,
      pinnedNodes: activeEnv.pinnedNodes.map(n =>
        n.id === editNode.id ? (form as PinnedNode) : n
      ),
      lastModified: new Date().toISOString(),
    };
    const newEnvs = environments.map(e => (e.id === activeId ? updatedEnv : e));
    save(newEnvs);
    setEditOpen(false);
  };

  const clearAll = () => {
    if (!confirm('Delete **ALL** created things in this environment?')) return;
    const updatedEnv = {
      ...activeEnv,
      pinnedNodes: [],
      actionLog: [],
      lastModified: new Date().toISOString(),
    };
    const newEnvs = environments.map(e => (e.id === activeId ? updatedEnv : e));
    save(newEnvs);
    setSelectedIds(new Set());
  };

  const exportEnv = () => {
    const blob = new Blob([JSON.stringify(activeEnv, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `env_${activeEnv.id}_full.json`;
    a.click();
  };

  // -------------------------------------------------
  // Resolve Location (from root or pathOptions traits)
  // -------------------------------------------------
  const resolveLocation = (node: PinnedNode): { x?: number; y?: number; z?: number } | null => {
    const rootTraits = node.attributes?.assignedTraits || node.assignedTraits || {};
    const pathTraits = node.pathOptions?.assignedTraits || {};
    const locId = rootTraits.location?.id || pathTraits.location?.id;
    if (!locId) return null;

    const coordNode = activeEnv.pinnedNodes.find(n => n.id === locId);
    const coordTraits = coordNode?.attributes?.assignedTraits || coordNode?.assignedTraits || coordNode?.pathOptions?.assignedTraits || {};
    return {
      x: coordTraits.x?.value,
      y: coordTraits.y?.value,
      z: coordTraits.z?.value,
    };
  };

  // -------------------------------------------------
  // Render
  // -------------------------------------------------
  return (
    <Box sx={{ p: 3, maxWidth: 1600, mx: 'auto' }}>
      {/* === RETURN BUTTON === */}
      <Box sx={{ mb: 3 }}>
        <Button
          component={Link}
          href="/apps/environment-developer"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          size="medium"
        >
          Return to Environment Developer
        </Button>
      </Box>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={400}>
          LocalDB Manager – {activeEnv.name}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {selectedIds.size > 0 && (
            <Button
              variant="contained"
              color="error"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={deleteSelected}
            >
              Delete Selected ({selectedIds.size})
            </Button>
          )}
          <Button variant="outlined" size="small" startIcon={<DownloadIcon />} onClick={exportEnv}>
            Export Full
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<ClearAllIcon />}
            onClick={clearAll}
          >
            Clear All
          </Button>
        </Box>
      </Box>

      {/* Search */}
      <TextField
        fullWidth
        size="small"
        placeholder="Search by name, path, or trait..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isAllSelected}
              indeterminate={isIndeterminate}
              onChange={toggleSelectAll}
            />
          }
          label="Select All"
        />
        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
          {selectedIds.size} selected • {filteredNodes.length} shown
        </Typography>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'secondary.main' }}>
              <TableCell padding="checkbox" sx={{ color: 'white' }}>
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={toggleSelectAll}
                  sx={{ color: 'white' }}
                />
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 500 }}>ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 500 }}>Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 500 }}>Path</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 500 }}>Traits</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 500 }}>Location (X Y Z)</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 500 }}>Path Options</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 500 }}>Created</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 500 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredNodes.map(node => {
              const isSelected = selectedIds.has(node.id);
              const location = resolveLocation(node);
              const rootTraits = node.attributes?.assignedTraits || node.assignedTraits || {};
              const pathTraits = node.pathOptions?.assignedTraits || {};
              const otherPathOptions = { ...node.pathOptions };
              delete otherPathOptions.assignedTraits; // don't show twice

              return (
                <TableRow key={node.id} hover selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                     b checked={isSelected}
                      onChange={() => toggleSelect(node.id)}
                    />
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                    <Tooltip title={node.id}>
                      <span>{node.id.slice(0, 20)}...</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{node.name}</TableCell>
                  <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <Tooltip title={node.fullPath}>
                      <span>{node.fullPath}</span>
                    </Tooltip>
                  </TableCell>

                  {/* === TRAITS COLUMN (root + path) === */}
                  <TableCell>
                    {Object.keys(rootTraits).length > 0 || Object.keys(pathTraits).length > 0 ? (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {Object.entries(rootTraits).map(([key, trait]) => (
                          <Chip
                            key={`root-${key}`}
                            label={`${trait.name}${trait.value !== undefined ? `: ${trait.value}` : ''}`}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                        {Object.entries(pathTraits).map(([key, trait]) => (
                          <Chip
                            key={`path-${key}`}
                            label={`${trait.name}${trait.value !== undefined ? `: ${trait.value}` : ''}`}
                            size="small"
                            color="secondary"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    ) : (
                      <Typography variant="caption" color="text.disabled">—</Typography>
                    )}
                  </TableCell>

                  {/* === LOCATION COLUMN === */}
                  <TableCell>
                    {location ? (
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {location.x !== undefined && <Chip label={`X: ${location.x}`} size="small" color="success" />}
                        {location.y !== undefined && <Chip label={`Y: ${location.y}`} size="small" color="success" />}
                        {location.z !== undefined && <Chip label={`Z: ${location.z}`} size="small" color="success" />}
                      </Box>
                    ) : rootTraits.location || pathTraits.location ? (
                      <Chip label="Ref: Yes" size="small" color="info" />
                    ) : (
                      <Typography variant="caption" color="text.disabled">—</Typography>
                    )}
                  </TableCell>

                  {/* === PATH OPTIONS COLUMN (non-trait) === */}
                  <TableCell>
                    {node.pathOptions && (Object.keys(otherPathOptions).length > 0 || Object.keys(pathTraits).length > 0) ? (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {/* Render non-trait path options */}
                        {Object.entries(otherPathOptions).map(([k, v]) => (
                          <Chip
                            key={k}
                            label={`${k}: ${JSON.stringify(v).slice(0, 20)}...`}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                        {/* Optionally show trait count */}
                        {Object.keys(pathTraits).length > 0 && (
                          <Chip
                            label={`Traits: ${Object.keys(pathTraits).length}`}
                            size="small"
                            color="secondary"
                            variant="filled"
                          />
                        )}
                      </Box>
                    ) : (
                      <Typography variant="caption" color="text.disabled">—</Typography>
                    )}
                  </TableCell>

                  <TableCell sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                    {new Date(node.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => openEdit(node)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => deleteNode(node.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Node – {editNode?.name}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={form.name ?? ''}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            label="Full Path"
            fullWidth
            margin="dense"
            value={form.fullPath ?? ''}
            onChange={e => setForm({ ...form, fullPath: e.target.value })}
          />
          <TextField
            label="Created At"
            fullWidth
            margin="dense"
            value={form.createdAt ?? ''}
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveEdit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}