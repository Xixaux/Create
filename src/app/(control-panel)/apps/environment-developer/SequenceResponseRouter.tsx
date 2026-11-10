'use client';

import React, { useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type SequenceResponseType = 'logic' | 'calculation' | 'action';

interface SequenceResponse {
  type: SequenceResponseType;
  value: number | boolean | string;
}

// Extend Array prototype temporarily for meta attachment
declare global {
  interface Array<T> {
    sequenceResponse?: SequenceResponse;
  }
}

interface SequenceResponseRouterProps {
  sequences: any[][]; // Live sequences from ExecutionConsole
}

export default function SequenceResponseRouter({
  sequences,
}: SequenceResponseRouterProps) {
  // Process each sequence and attach sequenceResponse
  const processedSequences = useMemo(() => {
    return sequences.map((seq) => {
      if (seq.length === 0) return seq;

      let type: SequenceResponseType | null = null;
      let value: any = null;

      // Priority: calculation > logic > action
      const hasCalculation = seq.some((node: any) => node.attributes?.nodecalculation?.isCalculationNode === true);
      const hasLogic = seq.some((node: any) => node.attributes?.nodelogic?.isLogicNode === true);
      const hasAction = seq.some((node: any) => node.attributes?.nodeactions?.isActionNode === true);

      if (hasCalculation && seq.length >= 3) {
        type = 'calculation';
        // Look for known operators
        const opNode = seq[1];
        const opId = opNode.parentFolderId || '';
        const leftVal = Number(seq[0].attributes?.nodeDefinition?.value);
        const rightVal = Number(seq[2].attributes?.nodeDefinition?.value);

        if (!isNaN(leftVal) && !isNaN(rightVal)) {
          if (opId === '2.1.1.1.1.1' || opId === '2.1.1.1.1.6' || opNode.name?.toLowerCase().includes('plus')) {
            value = leftVal + rightVal;
          } else if (opId === '2.1.1.1.1.2' || opNode.name?.toLowerCase().includes('minus')) {
            value = leftVal - rightVal;
          } else {
            value = 'Calculation detected but unsupported operator';
          }
        } else {
          value = 'Invalid calculation operands';
        }
      } else if (hasLogic) {
        type = 'logic';
        // Assume standard if-expression: if → left → op → right
        if (seq.length >= 4 && seq[0].parentFolderId === '2.2.2.2.1') {
          const leftVal = Number(seq[1].attributes?.nodeDefinition?.value);
          const opId = seq[2].parentFolderId;
          const rightVal = Number(seq[3].attributes?.nodeDefinition?.value);

          if (!isNaN(leftVal) && !isNaN(rightVal)) {
            if (opId === '2.1.1.1.1.14') { // Equal
              value = leftVal === rightVal;
            } else {
              value = 'Logic detected but unsupported comparison';
            }
          } else {
            value = 'Invalid logic operands';
          }
        } else {
          value = 'Logic sequence format not recognized';
        }
      } else if (hasAction) {
        type = 'action';
        value = `Action: ${seq.map((n: any) => n.name || 'Unknown').join(' → ')}`;
      }

      if (type && value !== null) {
        Object.defineProperty(seq, 'sequenceResponse', {
          value: { type, value },
          writable: true,
          enumerable: false,
          configurable: true,
        });
      }

      return seq;
    });
  }, [sequences]);

  // Expose globally + log
  useEffect(() => {
    const responses = processedSequences
      .filter((seq: any) => seq.sequenceResponse)
      .map((seq: any) => seq.sequenceResponse);

    if (typeof window !== 'undefined') {
      (window as any).__sequenceResponses = responses;
      (window as any).__lastSequenceResponses = responses; // backward compat
    }

    responses.forEach((resp: SequenceResponse, i: number) => {
      const colorMap = {
        calculation: '#ffeb3b',
        logic: '#18ffff',
        action: '#ba68c8',
      };
      console.log(
        `%c[SEQUENCE RESPONSE ${i + 1}] ${resp.type.toUpperCase()} → ${resp.value}`,
        `color: ${colorMap[resp.type]}; font-weight: bold; font-size: 1.1em; background: #000; padding: 4px 8px; border-radius: 4px;`
      );
    });
  }, [processedSequences]);

  return (
    <Box sx={{ p: 3, bgcolor: '#f0f8ff', borderRadius: 2, border: '2px dashed #00A4EF', mt: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, color: '#00A4EF', mb: 1 }}>
        Sequence Response Router Active
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Processed {sequences.length} sequence(s). Responses attached and available at{' '}
        <code style={{ color: '#d32f2f', fontWeight: 'bold' }}>window.__sequenceResponses</code>
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        Use in SequencetoAnimation: <strong>(window as any).__sequenceResponses</strong>
      </Typography>
    </Box>
  );
}