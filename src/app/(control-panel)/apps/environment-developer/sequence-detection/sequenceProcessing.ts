// src/app/(control-panel)/apps/environment-developer/sequence-detection/sequenceProcessing.ts

export interface SequencePatternStep {
  folderId: string;
  repeatable?: boolean;
  label?: string;
}

export interface SequenceProcessor {
  id: string;
  name: string;
  description?: string;
  badgeLabel: string;
  pattern: SequencePatternStep[];
}

export interface StagedNode {
  id: string;
  parentFolderId?: string;
  folderId?: string;
  attributes?: {
    nodeDefinition?: {
      operandName?: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
  [key: string]: any;
}

export interface LogicComparisonResult {
  detected: boolean;
  comparison: 'same' | 'different' | null;
  leftOperand: {
    createdId: string;
    text: string;
  } | null;
  rightOperand: {
    createdId: string;
    text: string;
  } | null;
}

// Exact folder ID sequence you specified
const LOGIC_FOLDER_PATTERN: SequencePatternStep[] = [
  { folderId: '2.2.2.2.1' },
  { folderId: '2.2.2.1.1.1' },
  { folderId: '2.2.2.2.3' },
  { folderId: '2.2.2.1.1.2' },
  { folderId: '2.2.2.2.2' },
  { folderId: '2.2.2.2.5' },
  { folderId: '2.2.2.1.1.2' },
];

function sequenceMatchesFolderPattern(sequence: StagedNode[]): boolean {
  if (sequence.length < LOGIC_FOLDER_PATTERN.length) return false;

  for (let i = 0; i < LOGIC_FOLDER_PATTERN.length; i++) {
    const node = sequence[i];
    if (!node) return false;

    const folderId = node.parentFolderId || node.folderId;
    if (folderId !== LOGIC_FOLDER_PATTERN[i].folderId) {
      return false;
    }
  }

  return true;
}

export function compareLogicOperands(
  stagedSequences: StagedNode[][] | undefined
): LogicComparisonResult {
  if (!stagedSequences || stagedSequences.length === 0) {
    return { detected: false, comparison: null, leftOperand: null, rightOperand: null };
  }

  for (const sequence of stagedSequences) {
    if (sequenceMatchesFolderPattern(sequence)) {
      const leftNode = sequence[1];   // 2.2.2.1.1.1
      const rightNode = sequence[3];  // first 2.2.2.1.1.2

      const leftText = leftNode?.attributes?.nodeDefinition?.operandName?.trim() || '';
      const rightText = rightNode?.attributes?.nodeDefinition?.operandName?.trim() || '';

      const comparison = leftText === rightText ? 'same' : 'different';

      return {
        detected: true,
        comparison,
        leftOperand: {
          createdId: leftNode.id,
          text: leftText,
        },
        rightOperand: {
          createdId: rightNode.id,
          text: rightText,
        },
      };
    }
  }

  return { detected: false, comparison: null, leftOperand: null, rightOperand: null };
}

// ← RESTORED — required by SequenceSets.tsx
export const SEQUENCE_PROCESSORS: SequenceProcessor[] = [
  {
    id: 'logic-expression-x',
    name: 'Logic Expression',
    description: 'If → Variable → Or → Variable → And → Not → Variable',
    badgeLabel: 'Logic Chain',
    pattern: LOGIC_FOLDER_PATTERN,
  },
];