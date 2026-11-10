'use client';

import React, { lazy, Suspense, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircularProgress from '@mui/material/CircularProgress';

interface PinnedNode {
  id: string;
  name: string;
  attributes?: any;
}

interface NodeDefinitionProps {
  parentFolderId: string;
  onUpdate?: (data: { nodeDefinition: Record<string, any> }) => void;
  pathOptions?: Record<string, any>;
  createdThings?: PinnedNode[];
}

// === Lazy Imports (one per component, no duplicates) ===
const OrOperator = lazy(() => import('./node-definitions/or_2_2_2_2_3'));
const Size = lazy(() => import('./node-definitions/Size_2_1_2_2'));
const Quantity = lazy(() => import('./node-definitions/Quantity_2_1_2_1'));
const Headword = lazy(() => import('./node-definitions/Headword_2_1_8_1'));
const Plus = lazy(() => import('./node-definitions/Plus_2_1_1_1_1_1'));
const Minus = lazy(() => import('./node-definitions/Minus_2_1_1_1_1_2'));
const ThenOperator = lazy(() => import('./node-definitions/then_2_2_2_2_12'));
const Divide = lazy(() => import('./node-definitions/Divide_2_1_1_1_1_3'));
const Multiply = lazy(() => import('./node-definitions/Multiply_2_1_1_1_1_4'));
const Subtract = lazy(() => import('./node-definitions/Subtract_2_1_1_1_1_5'));
const Add = lazy(() => import('./node-definitions/Add_2_1_1_1_1_6'));
const Equal = lazy(() => import('./node-definitions/Equal_2_1_1_1_1_14'));
const Equivalent = lazy(() => import('./node-definitions/Equivalent_2_1_1_1_1_20'));
const If = lazy(() => import('./node-definitions/If_2_2_2_2_1'));
const And = lazy(() => import('./node-definitions/And_2_2_2_2'));
const Or = lazy(() => import('./node-definitions/Or_2_2_2_3'));
const Xor = lazy(() => import('./node-definitions/Xor_2_2_2_4'));
const Else = lazy(() => import('./node-definitions/Else_2_2_2_5'));
const Not = lazy(() => import('./node-definitions/Not_2_2_2_6'));
const While = lazy(() => import('./node-definitions/While_2_2_2_7'));
const Then = lazy(() => import('./node-definitions/Then_2_2_2_8'));
const Variable = lazy(() => import('./node-definitions/Variable_2_4'));
const Value = lazy(() => import('./node-definitions/Value_2_5'));
const Associate = lazy(() => import('./node-definitions/Associate_2_1_8'));
const Definition = lazy(() => import('./node-definitions/Definition_2_1_8_2'));
const Color = lazy(() => import('./node-definitions/Color_2_3_1'));
const BlueColor = lazy(() => import('./node-definitions/BlueColor_2_3_1_5'));
const Number = lazy(() => import('./node-definitions/Number_2_1_1'));
const XYZ = lazy(() => import('./node-definitions/XYZ_2_1_5_2_1'));
const Spectrum = lazy(() => import('./node-definitions/Spectrum_2_1_4'));
const Progression = lazy(() => import('./node-definitions/Progression_2_1_7'));
const Flip = lazy(() => import('./node-definitions/Flip_2_1_9_24'));
const Cube = lazy(() => import('./node-definitions/Cube_2_1_2_6_2_4'));
const Hexomino = lazy(() => import('./node-definitions/Hexomino_2_1_2_6_2_10'));
const Young = lazy(() => import('./node-definitions/Young_2_1_3_2_16'));
const TwoD = lazy(() => import('./node-definitions/2D_2_1_2_6_1'));
const ThreeD = lazy(() => import('./node-definitions/3D_2_1_2_6_2'));
const Coordinates = lazy(() => import('./node-definitions/Coordinates_2_1_5_2'));
const Direction = lazy(() => import('./node-definitions/Direction_2_1_5_1_3'));
const Speed = lazy(() => import('./node-definitions/Speed_2_1_5_1_2'));
const Angle = lazy(() => import('./node-definitions/Angle_2_1_5_1_7'));
const Distance = lazy(() => import('./node-definitions/Distance_2_1_5_1_4'));
const Duration = lazy(() => import('./node-definitions/Duration_2_1_5_1_5'));
const Movement = lazy(() => import('./node-definitions/Movement_2_1_5_1'));
const AddAction = lazy(() => import('./node-definitions/Add_2_1_9_5'));
const Remove = lazy(() => import('./node-definitions/Remove_2_1_9_4'));
const Find = lazy(() => import('./node-definitions/Find_2_1_9_49'));
const Replace = lazy(() => import('./node-definitions/Replace_2_1_9_11'));

// Logic Operators
const AndOperator = lazy(() => import('./node-definitions/and_2_2_2_2_2'));
const ElseOperator = lazy(() => import('./node-definitions/else_2_2_2_2_6'));
const ElseIfOperator = lazy(() => import('./node-definitions/elseif_2_2_2_2_7'));
const WhileOperator = lazy(() => import('./node-definitions/while_2_2_2_2_8'));
const NotOperator = lazy(() => import('./node-definitions/not_2_2_2_2_5'));
const XorOperator = lazy(() => import('./node-definitions/xor_2_2_2_2_4'));
const NandOperator = lazy(() => import('./node-definitions/nand_2_2_2_2_9'));
const NorOperator = lazy(() => import('./node-definitions/nor_2_2_2_2_10'));
const XnorOperator = lazy(() => import('./node-definitions/xnor_2_2_2_2_11'));

// Operands
const LeftOperand = lazy(() => import('./node-definitions/LeftOperand_2_2_2_1_1_1'));
const RightOperand = lazy(() => import('./node-definitions/RightOperand_2_2_2_1_1_2'));
const TargetLvalue = lazy(() => import('./node-definitions/TargetLvalue_2_2_2_1_1_3'));
const SourceRvalue = lazy(() => import('./node-definitions/SourceRvalue_2_2_2_1_1_4'));

// Comparison Operators (matching your current filenames)
const NotEqual = lazy(() => import('./node-definitions/NotEqual_2_1_1_1_1_15'));
const GreaterThan = lazy(() => import('./node-definitions/GreaterThan_2_1_1_1_1_16'));
const LessThan = lazy(() => import('./node-definitions/LessThan_2_1_1_1_1_17'));
const GreaterOrEqual = lazy(() => import('./node-definitions/GreaterorEqual_2_1_1_1_1_18')); // matches filename
const LessOrEqual = lazy(() => import('./node-definitions/LessorEqual_2_1_1_1_1_19'));

// === Role Map (no duplicates) ===
const roleMap: Record<string, React.ComponentType<any>> = {
  '2.1.1.1.1.1': Plus,
  '2.1.1.1.1.2': Minus,
  '2.1.1.1.1.3': Divide,
  '2.1.1.1.1.4': Multiply,
  '2.1.1.1.1.5': Subtract,
  '2.1.1.1.1.6': Add,
  '2.1.1.1.1.14': Equal,
  '2.1.1.1.1.15': NotEqual,
  '2.1.1.1.1.16': GreaterThan,
  '2.1.1.1.1.17': LessThan,
  '2.1.1.1.1.18': GreaterOrEqual,
  '2.1.1.1.1.19': LessOrEqual,
  '2.1.1.1.1.20': Equivalent,
'2.2.2.2.12': ThenOperator,
  '2.2.2.2.1': If,
  '2.2.2.2.2': AndOperator,
  '2.2.2.2.3': OrOperator,
  '2.2.2.2.4': XorOperator,
  '2.2.2.2.5': NotOperator,
  '2.2.2.2.6': ElseOperator,
  '2.2.2.2.7': ElseIfOperator,
  '2.2.2.2.8': WhileOperator,
  '2.2.2.2.9': NandOperator,
  '2.2.2.2.10': NorOperator,
  '2.2.2.2.11': XnorOperator,

  '2.2.2.1.1.1': LeftOperand,
  '2.2.2.1.1.2': RightOperand,
  '2.2.2.1.1.3': TargetLvalue,
  '2.2.2.1.1.4': SourceRvalue,

  '2.1.1': Number,
  '2.1.2.1': Quantity,
  '2.1.2.2': Size,
  '2.1.3.2.16': Young,
  '2.1.4': Spectrum,
  '2.1.5.1': Movement,
  '2.1.5.1.2': Speed,
  '2.1.5.1.3': Direction,
  '2.1.5.1.4': Distance,
  '2.1.5.1.5': Duration,
  '2.1.5.1.7': Angle,
  '2.1.5.2': Coordinates,
  '2.1.5.2.1': XYZ,
  '2.1.7': Progression,
  '2.1.8.1': Headword,
  '2.1.8.2': Definition,
  '2.1.9.1': Associate,
  '2.1.9.4': Remove,
  '2.1.9.5': AddAction,
  '2.1.9.11': Replace,
  '2.1.9.24': Flip,
  '2.1.9.49': Find,
  '2.3.1': Color,
  '2.3.1.5': BlueColor,
  '2.1.2.6.1': TwoD,
  '2.1.2.6.2': ThreeD,
  '2.1.2.6.2.4': Cube,
  '2.1.2.6.2.10': Hexomino,
  '2.4': Variable,
  '2.5': Value,
};

// === Role Labels ===
const roleLabels: Record<string, { label: string; color?: any }> = {
  '2.1.1.1.1.1': { label: 'Plus', color: 'primary' },
  '2.1.1.1.1.2': { label: 'Minus', color: 'primary' },
  '2.1.1.1.1.3': { label: 'Divide', color: 'primary' },
  '2.1.1.1.1.4': { label: 'Multiply', color: 'primary' },
  '2.1.1.1.1.5': { label: 'Subtract', color: 'primary' },
  '2.1.1.1.1.6': { label: 'Add', color: 'primary' },
  '2.1.1.1.1.14': { label: 'Equal', color: 'primary' },
  '2.1.1.1.1.15': { label: '≠', color: 'primary' },
  '2.1.1.1.1.16': { label: '>', color: 'primary' },
  '2.1.1.1.1.17': { label: '<', color: 'primary' },
  '2.1.1.1.1.18': { label: '≥', color: 'primary' },
  '2.1.1.1.1.19': { label: '≤', color: 'primary' },
  '2.1.1.1.1.20': { label: 'Equivalent', color: 'primary' },
'2.2.2.2.12': { label: 'then →', color: 'info' },
  '2.2.2.2.1': { label: 'if', color: 'success' },
  '2.2.2.2.2': { label: 'and', color: 'success' },
  '2.2.2.2.3': { label: 'or', color: 'success' },
  '2.2.2.2.4': { label: 'xor', color: 'info' },
  '2.2.2.2.5': { label: 'not', color: 'warning' },
  '2.2.2.2.6': { label: 'else', color: 'success' },
  '2.2.2.2.7': { label: 'elseif', color: 'success' },
  '2.2.2.2.8': { label: 'while', color: 'success' },
  '2.2.2.2.9': { label: 'nand', color: 'info' },
  '2.2.2.2.10': { label: 'nor', color: 'info' },
  '2.2.2.2.11': { label: 'xnor', color: 'info' },

  '2.2.2.1.1.1': { label: 'Left Operand', color: 'primary' },
  '2.2.2.1.1.2': { label: 'Right Operand', color: 'primary' },
  '2.2.2.1.1.3': { label: 'Target L-Value', color: 'primary' },
  '2.2.2.1.1.4': { label: 'Source R-Value', color: 'primary' },

  '2.1.1': { label: 'Number', color: 'primary' },
  '2.1.2.1': { label: 'Quantity', color: 'info' },
  '2.1.2.2': { label: 'Size', color: 'info' },
  '2.1.3.2.16': { label: 'Young', color: 'warning' },
  '2.1.4': { label: 'Spectrum', color: 'info' },
  '2.1.5.1': { label: 'Movement', color: 'warning' },
  '2.1.5.1.2': { label: 'Speed', color: 'info' },
  '2.1.5.1.3': { label: 'Direction', color: 'info' },
  '2.1.5.1.4': { label: 'Distance', color: 'info' },
  '2.1.5.1.5': { label: 'Duration', color: 'info' },
  '2.1.5.1.7': { label: 'Angle (Degrees)', color: 'info' },
  '2.1.5.2': { label: 'Coordinates (X Y Z)', color: 'info' },
  '2.1.5.2.1': { label: 'X Y Z', color: 'info' },
  '2.1.7': { label: 'Progression', color: 'success' },
  '2.1.8.1': { label: 'Headword', color: 'primary' },
  '2.1.8.2': { label: 'Definition', color: 'primary' },
  '2.1.9.1': { label: 'Associate', color: 'warning' },
  '2.1.9.4': { label: 'Remove', color: 'error' },
  '2.1.9.5': { label: 'Add (Action)', color: 'success' },
  '2.1.9.11': { label: 'Replace With', color: 'secondary' },
  '2.1.9.24': { label: 'Flip', color: 'warning' },
  '2.1.9.49': { label: 'Find', color: 'warning' },
  '2.3.1': { label: 'Color', color: 'primary' },
  '2.3.1.5': { label: 'Blue Color', color: 'info' },
  '2.1.2.6.1': { label: '2D Grid (3×3)', color: 'info' },
  '2.1.2.6.2': { label: '3D Grid (3×3×3)', color: 'info' },
  '2.1.2.6.2.4': { label: 'Cube', color: 'info' },
  '2.1.2.6.2.10': { label: 'Hexomino', color: 'info' },
  '2.4': { label: 'Variable' },
  '2.5': { label: 'Value', color: 'primary' },
};

// === Component ===
export default function NodeDefinition({ parentFolderId, onUpdate, pathOptions = {}, createdThings = [] }: NodeDefinitionProps) {
  const RoleComponent = roleMap[parentFolderId];
  const roleInfo = roleLabels[parentFolderId];
  const [roleApplied, setRoleApplied] = useState(false);

  if (!RoleComponent || !roleInfo) {
    return (
      <Box sx={{ mt: 3, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: '8px' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>Node Definition (Identity)</Typography>
        <Typography variant="caption" color="text.secondary">No configurable role available.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 3, p: 2, border: `1px solid ${roleInfo.color || 'primary'}.main`, borderRadius: '8px', bgcolor: 'background.paper' }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 1 }}>Node Definition (Identity)</Typography>
      <Chip label={roleInfo.label} size="small" color={roleInfo.color || 'primary'} sx={{ bgcolor: 'white', fontWeight: 500 }} />

      <Suspense fallback={<CircularProgress size={20} sx={{ mt: 2 }} />}>
        <RoleComponent pathOptions={pathOptions} onUpdate={onUpdate} createdThings={createdThings} />
      </Suspense>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
        <Collapse in={roleApplied}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'success.main' }}>
            <CheckCircleOutlineIcon fontSize="small" />
            <Typography variant="caption" sx={{ fontWeight: 500 }}>Role Applied</Typography>
          </Box>
        </Collapse>

        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            onUpdate?.({ nodeDefinition: pathOptions.nodeDefinition ?? {} });
            setRoleApplied(true);
            setTimeout(() => setRoleApplied(false), 2000);
          }}
          disabled={!pathOptions.nodeDefinition || Object.keys(pathOptions.nodeDefinition).length === 0}
          sx={{ textTransform: 'none', borderColor: '#00A4EF', color: '#00A4EF' }}
        >
          Apply Definition
        </Button>
      </Box>
    </Box>
  );
}