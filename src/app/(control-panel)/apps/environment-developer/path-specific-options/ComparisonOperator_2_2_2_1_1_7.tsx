'use client';

import React, { useState, useEffect } from 'react';
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

const TARGET_NODE_ID = '2.2.2.1.1.7';

const COMPARISON_OPERATOR_PATHS = [
  '2.1.1.1.1.5',  // Subtract
  '2.1.1.1.1.6',  // Add
  '2.1.1.1.1.14', // Equal
  '2.1.1.1.1.15', // Not Equal
  '2.1.1.1.1.16', // Greater Than
  '2.1.1.1.1.17', // Less Than
  '2.1.1.1.1.18', // Greater or Equal
  '2.1.1.1.1.19', // Less or Equal
  '2.1.1.1.1.20', // Equivalent
] as const;

const isUnderPath = (nodeId: string): boolean => {
  if (!nodeId?.startsWith('created_')) return false;
  const match = nodeId.match(/^created_(?:\d+_)*(.+)$/);
  if (!match) return false;
  const path = match[1];
  return COMPARISON_OPERATOR_PATHS.some(opPath => path === opPath || path.startsWith(opPath + '.'));
};

export default function ComparisonOperator_2_2_2_1_1_7({ currentNodeId, onUpdate, pinnedNodes = [], pathOptions = {} }: Props) {
  // Only render if we're editing the specific comparison operator node
  if (currentNodeId !== TARGET_NODE_ID) return null;

  const [selectedOperatorId, setSelectedOperatorId] = useState<string>('');

  useEffect(() => {
    setSelectedOperatorId(pathOptions?.assignedTraits?.operator?.id || '');
  }, [pathOptions]);

  // Filter pinnedNodes for created instances of the known comparison operator paths
  const availableOperators = pinnedNodes
    .filter(n => isUnderPath(n.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  const currentNodeName = pinnedNodes.find(n => n.id === currentNodeId)?.name || 'Comparison Operator';

  return (
    <Box sx={{ mt: 3, p: 3, border: '2px solid', borderColor: 'info.main', borderRadius: '8px', bgcolor: 'info.50' }}>
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500, color: 'info.main' }}>
        {currentNodeName}
      </Typography>

      <FormControl size="small" fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Comparison Operator</InputLabel>
        <Select
          value={selectedOperatorId}
          onChange={(e) => {
            const selectedId = e.target.value as string;
            setSelectedOperatorId(selectedId);
            const selected = availableOperators.find(op => op.id === selectedId);
            if (selected) {
              onUpdate({
                assignedTraits: {
                  ...(pathOptions.assignedTraits || {}),
                  operator: {
                    name: selected.name ?? 'Unnamed Operator',
                    id: selected.id,
                  },
                },
              });
            } else if (selectedId === '') {
              // Clear selection
              const { operator: _, ...rest } = pathOptions.assignedTraits || {};
              onUpdate({ assignedTraits: rest });
            }
          }}
          label="Select Comparison Operator"
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {availableOperators.length > 0 ? (
            availableOperators.map((op) => (
              <MenuItem key={op.id} value={op.id}>
                {op.name ?? 'Unnamed'} ({op.id.replace(/^created_(?:\d+_)*(.+)$/, '$1')})
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No comparison operators created yet</MenuItem>
          )}
        </Select>
      </FormControl>

      <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {pathOptions.assignedTraits?.operator && (
          <Chip
            label={`Operator: ${pathOptions.assignedTraits.operator.name ?? 'Unknown'}`}
            color="primary"
            size="small"
          />
        )}
      </Box>
    </Box>
  );
}