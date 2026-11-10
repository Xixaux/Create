'use client';

import React, { useState, useEffect, useMemo } from 'react';
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

const TRAIT_PATHS = {
  variable: '2.4',
  operator: '2.1.1.1.1',
  value: '2.5',
} as const;

const isUnderPath = (nodeId: string, basePath: string): boolean => {
  if (!nodeId?.startsWith('created_')) return false;
  const match = nodeId.match(/^created_(?:\d+_)*(.+)$/);
  if (!match) return false;
  const path = match[1];
  return path === basePath || path.startsWith(basePath + '.');
};

const traitLabels: Record<keyof typeof TRAIT_PATHS, string> = {
  variable: 'Variable',
  operator: 'Operator',
  value: 'Value',
};

export default function TargetLvalue_2_2_2_1_1_3({
  currentNodeId,
  onUpdate,
  pinnedNodes = [],
  pathOptions = {},
}: Props) {
  // Only render when exactly on the template node '2.2.2.1.1.3'
  if (currentNodeId !== '2.2.2.1.1.3') return null;

  const existing = pathOptions?.assignedTraits?.[currentNodeId] || {};

  const [selected, setSelected] = useState<Record<keyof typeof TRAIT_PATHS, string>>({
    variable: existing.variableId || '',
    operator: existing.operatorId || '',
    value: existing.valueId || '',
  });

  // Filter created nodes for each trait
  const options = useMemo(() => {
    const result: Record<keyof typeof TRAIT_PATHS, typeof pinnedNodes> = {
      variable: [],
      operator: [],
      value: [],
    };

    pinnedNodes.forEach((node) => {
      if (isUnderPath(node.id, TRAIT_PATHS.variable)) {
        result.variable.push(node);
      }
      if (isUnderPath(node.id, TRAIT_PATHS.operator)) {
        result.operator.push(node);
      }
      if (isUnderPath(node.id, TRAIT_PATHS.value)) {
        result.value.push(node);
      }
    });

    return result;
  }, [pinnedNodes]);

  // Update parent on selection change
  useEffect(() => {
    const update: any = {};

    (Object.keys(TRAIT_PATHS) as Array<keyof typeof TRAIT_PATHS>).forEach((key) => {
      const id = selected[key];
      if (id) {
        const node = pinnedNodes.find((n) => n.id === id);
        if (node) {
          update[`${key}Id`] = node.id;
          update[`${key}Name`] = node.name ?? 'Unnamed';
        }
      }
    });

    const hasSelections = Object.keys(update).length > 0;

    onUpdate({
      assignedTraits: {
        [currentNodeId]: hasSelections ? update : null,
      },
    });
  }, [selected, pinnedNodes, currentNodeId, onUpdate]);

  const currentTrait = pathOptions?.assignedTraits?.[currentNodeId];

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 3, fontWeight: 600 }}>
        Assign Target Left Value Traits
      </Typography>

      {(Object.keys(TRAIT_PATHS) as Array<keyof typeof TRAIT_PATHS>).map((key) => {
        const label = traitLabels[key];
        const nodes = options[key];
        const value = selected[key];

        return (
          <FormControl key={key} fullWidth size="small" sx={{ mb: 2.5 }}>
            <InputLabel>{label}</InputLabel>
            <Select
              value={value}
              label={label}
              onChange={(e) => setSelected((prev) => ({ ...prev, [key]: e.target.value as string }))}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {nodes.length > 0 ? (
                nodes.map((node) => (
                  <MenuItem key={node.id} value={node.id}>
                    {node.name ?? 'Unnamed'} ({node.id.replace(/^created_(?:\d+_)*(.+)$/, '$1')})
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No {label.toLowerCase()} nodes created yet</MenuItem>
              )}
            </Select>
          </FormControl>
        );
      })}

      {currentTrait && Object.keys(currentTrait).length > 0 && (
        <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {Object.entries(currentTrait)
            .filter(([k]) => k.endsWith('Name'))
            .map(([k, name]) => {
              const traitKey = k.replace('Name', '') as keyof typeof traitLabels;
              return (
                <Chip
                  key={k}
                  label={`${traitLabels[traitKey]}: ${name}`}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              );
            })}
        </Box>
      )}
    </Box>
  );
}