'use client';

import React, { lazy, Suspense } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import PathSpecificControls from './PathSpecificControls';

type PathSpecificOptionsProps = {
  currentNodeId: string;
  onUpdate: (data: any) => void;
  pinnedNodes?: Array<{ id: string; name: string; attributes?: any; nodeDefinition?: any }>;
  pathOptions?: Record<string, any>;
};

// Only keep lazy imports that are actually used in componentMap
const FactSourceRvalue = lazy(() => import('./path-specific-options/FactSourceRvalue_2_2_2_1_1_6'));
const Solid = lazy(() => import('./path-specific-options/Solid_1_1_1'));
const RadiationType = lazy(() => import('./path-specific-options/RadiationType_1_2_1'));
const Direction = lazy(() => import('./path-specific-options/Direction_2_1_5_1_3'));
const Size = lazy(() => import('./path-specific-options/Size_2_1_4_2'));
const Binary = lazy(() => import('./path-specific-options/Binary_2_1_6_1'));
const Color = lazy(() => import('./path-specific-options/Color_2_3_1'));
const CoordinatesXYZ = lazy(() => import('./path-specific-options/CoordinatesXYZ_2_1_5_2_1'));
const Shapes3D = lazy(() => import('./path-specific-options/Shapes3D_2_1_2_6_2'));
const LogicLeft = lazy(() => import('./path-specific-options/LogicOperand_2_2_2_1_1_1'));
const LogicRight = lazy(() => import('./path-specific-options/LogicOperand_2_2_2_1_1_2'));
const LogicTargetL = lazy(() => import('./path-specific-options/LogicOperand_2_2_2_1_1_3'));
const Movement = lazy(() => import('./path-specific-options/Movement_2_1_5_1'));
const LogicSourceR = lazy(() => import('./path-specific-options/LogicOperand_2_2_2_1_1_4'));
const LogicFactTarget = lazy(() => import('./path-specific-options/LogicOperand_2_2_2_1_1_5'));
const LogicFactSource = lazy(() => import('./path-specific-options/LogicOperand_2_2_2_1_1_6'));
const ComparisonOperator = lazy(() => import('./path-specific-options/ComparisonOperator_2_2_2_1_1_7'));
const Dictionary = lazy(() => import('./path-specific-options/Dictionary_2_1_8'));
const TargetLvalue = lazy(() => import('./path-specific-options/TargetLvalue_2_2_2_1_1_3'));
const Move = lazy(() => import('./path-specific-options/Move_2_1_9_46'));
const X = lazy(() => import('./path-specific-options/X_2_1_3_1'));
const Y = lazy(() => import('./path-specific-options/Y_2_1_3_2'));
const SourceRvalue = lazy(() => import('./path-specific-options/SourceRvalue_2_2_2_1_1_4'));
const Logic = lazy(() => import('./path-specific-options/Logic_2_2'));
const Identity = lazy(() => import('./path-specific-options/Identity_2_1_10'));

const componentMap: Record<string, React.ComponentType<any>> = {
  '1.1.1': Solid,
  '1.2.1': RadiationType,
  '2.1.5.1.3': Direction,
  '2.1.4.2': Size,
  '2.1.6.1': Binary,
  '2.1.8': Dictionary,
  '2.1.3.2': Y,
  '2.1.9.46': Move,
  '2.2': Logic,
  '2.2.2.1.1.4': SourceRvalue,
  '2.1.10': Identity,
  '2.3.1': Color,
  '2.1.3.1': X,
  '2.1.5.2.1': CoordinatesXYZ,
  '2.2.2.1.1.3': TargetLvalue,
  '2.1.2.6.2': Shapes3D,
  '2.2.2.1.1.1': LogicLeft,
  '2.2.2.1.1.2': LogicRight,
  '2.2.2.1.1.3': LogicTargetL,
  '2.1.5.1': Movement,
  '2.2.2.1.1.4': LogicSourceR,
  '2.2.2.1.1.6': FactSourceRvalue,
  '2.2.2.1.1.5': LogicFactTarget,
  '2.2.2.1.1.6': LogicFactSource,
  '2.2.2.1.1.7': ComparisonOperator,
};

const getComponentForId = (id: string): React.ComponentType<PathSpecificOptionsProps> | null => {
  if (componentMap[id]) return componentMap[id];
  if (id.startsWith('1.1.1.')) return Solid;
  if (id.startsWith('2.1.6.1.')) return Binary;
  return null;
};

export default function PathSpecificOptions({
  currentNodeId,
  onUpdate,
  pinnedNodes = [],
  pathOptions = {},
}: PathSpecificOptionsProps) {
  const id = currentNodeId?.trim() || '';

  const SpecificComponent = getComponentForId(id);

  return (
    <>
      {id && (
        <PathSpecificControls
          key={`universal-${id}`}
          currentNodeId={id}
          value={pathOptions?.[id]?.[id] ?? ''}
          onUpdate={onUpdate}
        />
      )}

      <Suspense
        fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <CircularProgress size={24} />
          </Box>
        }
      >
        {SpecificComponent && (
          <SpecificComponent
            currentNodeId={id}
            onUpdate={onUpdate}
            pinnedNodes={pinnedNodes}
            pathOptions={pathOptions}
          />
        )}
      </Suspense>
    </>
  );
}