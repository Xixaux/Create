/**
 * =============================================================================
 * useExecuteSequence — React Hook Wrapper for the Action Interpreter
 * =============================================================================
 */

import { useState, useCallback } from 'react';
import { ActionInterpreter } from '../services/ActionInterpreter';
import { PinnedNode } from '../environmentTypes';

interface UseExecuteSequenceOptions {
  onNewNodes?: (nodes: PinnedNode[]) => void;
  onComplete?: (result: { newNodes: PinnedNode[]; log: string[] }) => void;
}

export const useExecuteSequence = (options: UseExecuteSequenceOptions = {}) => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);

  // Fixed: Detect operator by folder ID (reliable)
  const evaluateMathSequence = (seq: any[], log: string[]) => {
    if (seq.length !== 3) return null;

    const left = seq[0];
    const op = seq[1];
    const right = seq[2];

    const calc = op.attributes?.nodecalculation;
    if (!calc?.isCalculationNode) return null;

    // Use the folder ID to identify the operator
    const folderId = op.parentFolderId || '';

    let operation: 'add' | 'subtract' | null = null;
    let symbol = '';

    if (folderId.startsWith('2.1.1.1.1.1')) {
      operation = 'add';
      symbol = '+';
    } else if (folderId.startsWith('2.1.1.1.1.2')) {
      operation = 'subtract';
      symbol = '-';
    }

    if (!operation) return null;

    const leftVal = parseInt(left.attributes?.nodeDefinition?.value ?? '', 10);
    const rightVal = parseInt(right.attributes?.nodeDefinition?.value ?? '', 10);

    if (isNaN(leftVal) || isNaN(rightVal)) {
      log.push(`Math error: Non-number values (${leftVal}, ${rightVal})`);
      return null;
    }

    const result = operation === 'add' ? leftVal + rightVal : leftVal - rightVal;

    log.push(`CALC: ${leftVal} ${symbol} ${rightVal} = ${result}`);

    const resultNode: PinnedNode = {
      id: `created_result_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: `Result: ${result}`,
      fullPath: 'Abstract Thing to Law to Numbers to Value',
      parentFolderId: '2.5',
      attributes: {
        nodeDefinition: { value: result.toString() },
        CreateTime: new Date().toISOString(),
      },
    };

    log.push(`Created result node: ${resultNode.name} (ID: ${resultNode.id})`);
    return [resultNode];
  };

  const execute = useCallback(
    async (stagedSequenceJson: string) => {
      setIsExecuting(true);
      setLastResult(null);
      const log: string[] = [];
      const newNodes: PinnedNode[] = [];

      let parsed;
      try {
        parsed = JSON.parse(stagedSequenceJson);
      } catch (e) {
        console.error('Failed to parse staged sequence', e);
        log.push('Parse error');
        setLastResult({ log, newNodes: [] });
        setIsExecuting(false);
        return;
      }

      if (parsed.type !== 'structured_sequence_v2' || !Array.isArray(parsed.sequence)) {
        log.push('Invalid sequence format');
        setLastResult({ log, newNodes: [] });
        setIsExecuting(false);
        return;
      }

      const sequence = parsed.sequence;

      // Math detection first (Plus/Minus)
      const mathNodes = evaluateMathSequence(sequence, log);
      if (mathNodes) {
        newNodes.push(...mathNodes);
        options.onNewNodes?.(newNodes);
        setLastResult({ log, newNodes });
        console.log('MATH EXECUTION:', log.join('\n'));
        setIsExecuting(false);
        return;
      }

      // Fallback: original ActionInterpreter
      try {
        const result = ActionInterpreter.run(sequence);
        log.push(...result.log);
        if (result.newNodes.length > 0) {
          newNodes.push(...result.newNodes);
          options.onNewNodes?.(result.newNodes);
        }
        setLastResult({ log, newNodes });
        options.onComplete?.({ log, newNodes: result.newNodes });
        console.log('ACTION EXECUTION COMPLETE:', log.join('\n'));
      } catch (err: any) {
        log.push(`Interpreter error: ${err.message}`);
        console.error(err);
      }

      setIsExecuting(false);
    },
    [options]
  );

  return {
    execute,
    isExecuting,
    lastResult,
    clearResult: () => setLastResult(null),
  };
};