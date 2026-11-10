// src/app/(control-panel)/apps/environment-developer/services/SequenceDiff.ts


// Compares before/after snapshots to produce human-readable change logs
// This is your debugger + audit trail. It closes the loop: you can now prove that a transformation actually happened.



export function computeSequenceChanges(before: any[], after: any[]): string[] {
  const changes: string[] = [];
  const ignoreKeys = new Set(['id', 'type', 'size', 'solid', 'appliedAt', 'location', 'structureType']);

  after.forEach((node, i) => {
    const beforeNode = before[i];
    const nodeChanges: string[] = [];

    if (beforeNode.name !== node.name) {
      nodeChanges.push(`   Name: "${beforeNode.name}" → "${node.name}"`);
    }

    const beforeAttrs = beforeNode.attributes || {};
    const afterAttrs = node.attributes || {};
    const allKeys = new Set([...Object.keys(beforeAttrs), ...Object.keys(afterAttrs)]);

    allKeys.forEach(key => {
      if (ignoreKeys.has(key)) return;
      // ... copy your existing diff logic here (shape handling, etc.)
      // exactly as you have it now — just paste it in
    });

    if (nodeChanges.length > 0) {
      changes.push(`Object "${node.name || 'Unnamed'}":`);
      changes.push(...nodeChanges);
      changes.push('');
    }
  });

  return changes.length > 0 ? changes : ['   No meaningful changes detected.'];
}