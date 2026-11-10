// hooks/useLiveJsonHierarchy.ts
import { useEffect, useState } from 'react';
import { HierarchyNode } from '../environmentTypes';

interface HierarchyDataWrapper {
  availableEnvironmentIDs: string[];
  currentEnvironmentID: string;
  hierarchies: { [key: string]: HierarchyNode[] };
}

export function useLiveJsonHierarchy(
  currentEnvironmentID: string = 'default'
): HierarchyNode[] {
  const [hierarchy, setHierarchy] = useState<HierarchyNode[]>([]);

  useEffect(() => {
    async function loadHierarchy() {
      try {
        // Force fresh import — bypass cache
        const module = await import('../environmentDb.json?t=' + Date.now());
        const data = module.default as HierarchyDataWrapper;
        const env = data.hierarchies[data.currentEnvironmentID || currentEnvironmentID];
        setHierarchy(env || []);
      } catch (err) {
        console.error('Failed to load environmentDb.json', err);
        setHierarchy([]);
      }
    }

    loadHierarchy();

    // Optional: Poll every 2s for changes (dev mode)
    const interval = setInterval(loadHierarchy, 2000);
    return () => clearInterval(interval);
  }, [currentEnvironmentID]);

  return hierarchy;
}