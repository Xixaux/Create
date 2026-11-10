// src/app/(control-panel)/apps/environment-developer/node-instructions/PlusOperator_2_1_1_1_1_1.tsx

export const execute = (seq: any[], log: (msg: string, style?: string) => void) => {
  if (seq.length !== 3) {
    log(`ERROR: Plus expects 3 nodes, got ${seq.length}`, 'color:#ff6b6b; font-weight:600;');
    return;
  }

  const [left, op, right] = seq;

  // 1. Validation check for the operator type
  if (!op.attributes?.nodecalculation?.isCalculationNode) return;

  // 2. Extract values using Number() to support floats/decimals
  const leftRaw = left.attributes?.nodeDefinition?.value;
  const rightRaw = right.attributes?.nodeDefinition?.value;

  const leftVal = Number(leftRaw);
  const rightVal = Number(rightRaw);

  // 3. Robust NaN check
  if (isNaN(leftVal) || isNaN(rightVal)) {
    log(
      `ERROR: Invalid values (L: ${leftRaw ?? 'null'}, R: ${rightRaw ?? 'null'})`,
      'color:#ff6b6b; font-weight:600;'
    );
    return;
  }

  const result = leftVal + rightVal;

  log(
    `█ ${leftVal} + ${rightVal} = ${result}`,
    'color:#00ff9d; font-weight:600; font-size:1.1em; text-shadow: 0 0 10px rgba(0,255,157,0.6);'
  );

  return result; // Returning the result allows for nested calculations later
};