'use client';

import { useState, useEffect, useCallback } from 'react';
import { HierarchyNode } from '../environmentTypes';
import { v4 as uuidv4 } from 'uuid';

export interface PinnedNode {
  id: string;
  name: string;
  fullPath: string;
  createdAt: Date;
  parentFolderId?: string;
  attributes?: Record<string, any>;
  pathOptions?: Record<string, any>;
}

export interface Environment {
  id: string;
  name: string;
  hierarchy: HierarchyNode[];
  pinnedNodes: PinnedNode[];
  virtualizedPhysicalObjects: PinnedNode[];
  definedActions: PinnedNode[];
  actionLog: string[];
  lastModified: Date;
  importedJson?: any;
}

/* --------------------------------------------------------------- */
/*  STORAGE KEYS – DO NOT CHANGE                                   */
/* --------------------------------------------------------------- */
const STORAGE_KEY = 'hierarchy_environments';
const ACTIVE_ENV_KEY = 'active_environment_id';
const BACKUP_KEY = 'hierarchy_environments_backup';

/* --------------------------------------------------------------- */
/*  ID deduplication                                               */
/* --------------------------------------------------------------- */
const sanitizeIds = (nodes: HierarchyNode[], seen = new Set<string>()): HierarchyNode[] => {
  return nodes.map(node => {
    let newId = node.id;
    let counter = 1;
    while (seen.has(newId)) {
      newId = `${node.id}_dup${counter++}`;
    }
    seen.add(newId);
    const sanitized: HierarchyNode = { ...node, id: newId };
    if (node.children?.length) {
      sanitized.children = sanitizeIds(node.children, seen);
    }
    return sanitized;
  });
};

/* --------------------------------------------------------------- */
/*  Remove internal `parent` before persisting                     */
/* --------------------------------------------------------------- */
const stripParent = (node: HierarchyNode): HierarchyNode => {
  const { parent, ...clean } = node;
  return {
    ...clean,
    children: node.children?.map(stripParent) || [],
  };
};

/* --------------------------------------------------------------- */
/*  Low-level storage                                              */
/* --------------------------------------------------------------- */
const saveToStorage = (envs: Environment[], activeId: string) => {
  try {
    const clean = envs.map(e => ({
      ...e,
      hierarchy: e.hierarchy.map(stripParent),
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
    localStorage.setItem(ACTIVE_ENV_KEY, activeId);
    localStorage.setItem(BACKUP_KEY, JSON.stringify(clean));
  } catch (err) {
    console.error('[ENV] Save failed', err);
  }
};

const loadFromStorage = (): { envs: Environment[]; activeId: string | null } => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const activeId = localStorage.getItem(ACTIVE_ENV_KEY);
    const envs: Environment[] = raw ? JSON.parse(raw) : [];
    return { envs, activeId };
  } catch (err) {
    console.error('[ENV] Load failed', err);
    return { envs: [], activeId: null };
  }
};

/* --------------------------------------------------------------- */
/*  Fresh empty environment                                        */
/* --------------------------------------------------------------- */
const createEmptyEnvironment = (name: string): Environment => ({
  id: uuidv4(),
  name,
  hierarchy: [],
  pinnedNodes: [],
  virtualizedPhysicalObjects: [],
  definedActions: [],
  actionLog: [],
  lastModified: new Date(),
});

/* --------------------------------------------------------------- */
/*  THE HOOK                                                       */
/* --------------------------------------------------------------- */
export const useEnvironment = () => {
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [activeEnvId, setActiveEnvId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /* -----------------------------------------------------------
   *  1. Load or create default
   * ----------------------------------------------------------- */
  useEffect(() => {
    const { envs, activeId } = loadFromStorage();

    if (envs.length === 0) {
      // Load default hierarchy from public JSON if nothing saved
      fetch('/environmentDb.json')
        .then(r => {
          if (!r.ok) throw new Error(`Failed to fetch: ${r.status}`);
          return r.json();
        })
        .then(data => {
          // Support both direct array and your current structure
const currentId = data.currentEnvironmentID || '1.1.1.1';
let hierarchy = data.hierarchies?.[currentId] || data || [];
          hierarchy = sanitizeIds(hierarchy);

          const fresh: Environment = {
            id: uuidv4(),
            name: 'Default Environment',
            hierarchy,
            pinnedNodes: [],
            virtualizedPhysicalObjects: [],
            definedActions: [],
            actionLog: [],
            lastModified: new Date(),
          };

          const arr = [fresh];
          saveToStorage(arr, fresh.id);
          setEnvironments(arr);
          setActiveEnvId(fresh.id);
        })
        .catch(err => {
          console.error('Failed to load hierarchy from environmentDb.json', err);
          // Fallback to empty if JSON fails
          const fresh = createEmptyEnvironment('Default Environment');
          const arr = [fresh];
          saveToStorage(arr, fresh.id);
          setEnvironments(arr);
          setActiveEnvId(fresh.id);
        })
        .finally(() => setIsLoading(false));

      return;
    }

    const sanitized = envs.map(e => ({
      ...e,
      hierarchy: sanitizeIds(e.hierarchy),
    }));

    setEnvironments(sanitized);
    setActiveEnvId(activeId ?? sanitized[0].id);
    setIsLoading(false);
  }, []);

  /* -----------------------------------------------------------
   *  2. Persist every change
   * ----------------------------------------------------------- */
  useEffect(() => {
    if (!isLoading && environments.length > 0 && activeEnvId) {
      saveToStorage(environments, activeEnvId);
    }
  }, [environments, activeEnvId, isLoading]);

  const activeEnvironment = environments.find(e => e.id === activeEnvId) || null;

  /* -----------------------------------------------------------
   *  Generic updater
   * ----------------------------------------------------------- */
  const updateActive = useCallback(
    <K extends keyof Environment>(key: K, value: Environment[K]) => {
      if (!activeEnvId) return;
      setEnvironments(prev =>
        prev.map(env =>
          env.id === activeEnvId
            ? {
                ...env,
                [key]:
                  key === 'hierarchy' ? sanitizeIds(value as HierarchyNode[]) : value,
                lastModified: new Date(),
              }
            : env
        )
      );
    },
    [activeEnvId]
  );

  /* -----------------------------------------------------------
   *  SAFE CLEAR ALL THINGS
   * ----------------------------------------------------------- */
  const clearAllThings = useCallback(() => {
    if (!activeEnvironment) return;
    const empty: Environment = {
      ...activeEnvironment,
      hierarchy: [],
      pinnedNodes: [],
      virtualizedPhysicalObjects: [],
      definedActions: [],
      actionLog: [],
      lastModified: new Date(),
    };
    setEnvironments(prev => prev.map(e => (e.id === activeEnvId ? empty : e)));
  }, [activeEnvironment, activeEnvId]);

  return {
    environments,
    activeEnvId,
    activeEnvironment,
    isLoading,

    updateHierarchy: (h: HierarchyNode[]) => updateActive('hierarchy', h),
    updatePinnedNodes: (p: PinnedNode[]) => updateActive('pinnedNodes', p),
    updateVirtualizedPhysicalObjects: (l: PinnedNode[]) =>
      updateActive('virtualizedPhysicalObjects', l),
    updateDefinedActions: (l: PinnedNode[]) => updateActive('definedActions', l),
    updateActionLog: (log: string[]) => updateActive('actionLog', log),

    clearAllThings, // ← safe reset
  };
};