// src/app/(control-panel)/apps/environment-developer/node-instructions/MinusOperator_2_1_1_1_1_2.tsx

// The node file gets the logger injected — no direct import needed
export const execute = (seq: any[], log: (msg: string, style?: string) => void) => {
  if (seq.length !== 3) {
    log(`ERROR: Minus expects 3 nodes, got ${seq.length}`, 'color:#ff6b6b; font-weight:600;');
    return;
  }

  const left = seq[0];
  const op = seq[1];
  const right = seq[2];

  if (!op.attributes?.nodecalculation?.isCalculationNode) return;

  const leftVal = parseInt(left.attributes?.nodeDefinition?.value ?? '', 10);
  const rightVal = parseInt(right.attributes?.nodeDefinition?.value ?? '', 10);

  if (isNaN(leftVal) || isNaN(rightVal)) {
    log(`ERROR: Minus received non-number values`, 'color:#ff6b6b; font-weight:600;');
    return;
  }

  const result = leftVal - rightVal;

  log(
    `${leftVal} − ${rightVal} = ${result}`,
    'color:#00ff9d; font-weight:600; font-size:1.1em; text-shadow: 0 0 0 10px rgba(0,255,157,0.6);'
  );
};