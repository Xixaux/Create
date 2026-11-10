'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';

type Props = {
  currentNodeId: string;
  onUpdate: (data: any) => void;
  pinnedNodes?: Array<{ id: string; name: string; attributes?: any; nodeDefinition?: any }>;
  pathOptions?: Record<string, any>;
};

const isUnderPath = (nodeId: string, basePath: string): boolean => {
  if (!nodeId?.startsWith('created_')) return false;
  const match = nodeId.match(/^created_(?:\d+_)*(.+)$/);
  if (!match) return false;
  return match[1] === basePath || match[1].startsWith(basePath + '.');
};

const logicOperandIds = [
  '2.2.2.1.1.1',
  '2.2.2.1.1.2',
  '2.2.2.1.1.3',
  '2.2.2.1.1.4',
  '2.2.2.1.1.5',
  '2.2.2.1.1.6',
];

export default function LogicOperand_2_2_2_1_1_1({ currentNodeId, onUpdate, pinnedNodes = [], pathOptions = {} }: Props) {
  if (!logicOperandIds.includes(currentNodeId)) return null;

  const variables = pinnedNodes
    .filter(n => isUnderPath(n.id, '2.4'))
    .sort((a, b) => a.name.localeCompare(b.name));

  const values = pinnedNodes
    .filter(n => isUnderPath(n.id, '2.5'))
    .sort((a, b) => a.name.localeCompare(b.name));

  const currentNodeName = pinnedNodes.find(n => n.id === currentNodeId)?.name || currentNodeId;

  return (
    <Box sx={{ mt: 3, p: 3, border: '2px solid', borderColor: 'info.main', borderRadius: '8px', bgcolor: 'info.50' }}>
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500, color: 'info.main' }}>
        {currentNodeName}
      </Typography>

      <FormControl size="small" fullWidth sx={{ mb: 2 }}>
        <InputLabel>Assign Variable (2.4)</InputLabel>
        <Select
          value={pathOptions.assignedTraits?.variable?.id || ''}
          onChange={(e) => {
            const selectedId = e.target.value as string;
            const selected = variables.find(v => v.id === selectedId);
            onUpdate({
              assignedTraits: {
                ...(pathOptions.assignedTraits || {}),
                variable: selected ? { name: selected.name ?? 'Unnamed', id: selected.id, type: 'variable' } : null,
              },
            });
          }}
          label="Assign Variable (2.4)"
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {variables.map((node) => (
            <MenuItem key={node.id} value={node.id}>
              [Variable] {node.name ?? 'Unnamed'}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" fullWidth sx={{ mb: 2 }}>
        <InputLabel>Assign Value (2.5)</InputLabel>
        <Select
          value={pathOptions.assignedTraits?.value?.id || ''}
          onChange={(e) => {
            const selectedId = e.target.value as string;
            const selected = values.find(v => v.id === selectedId);
            onUpdate({
              assignedTraits: {
                ...(pathOptions.assignedTraits || {}),
                value: selected
                  ? {
                      id: selected.id,
                      name: selected.name ?? 'Unnamed',
                      nodeDefinition: selected.nodeDefinition || selected.attributes?.nodeDefinition || {},
                    }
                  : null,
              },
            });
          }}
          label="Assign Value (2.5)"
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {values.map((node) => {
            const rd = node.nodeDefinition || node.attributes?.nodeDefinition || {};
            const val = rd.value ?? node.name ?? 'Unnamed';
            return (
              <MenuItem key={node.id} value={node.id}>
                [Value] {node.name ?? 'Unnamed'} → {val}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {pathOptions.assignedTraits?.variable && (
          <Chip label={`Variable: ${pathOptions.assignedTraits.variable.name ?? 'Unknown'}`} color="primary" size="small" />
        )}
        {pathOptions.assignedTraits?.value && (
          <Chip
            label={`Value: ${pathOptions.assignedTraits.value.nodeDefinition?.value ?? pathOptions.assignedTraits.value.name ?? 'None'}`}
            color="secondary"
            size="small"
          />
        )}
      </Box>
    </Box>
  );
}