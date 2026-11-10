// useHierarchyImport.ts
import { useState } from 'react';
import { HierarchyNode, validateImportedHierarchy } from './environmentTypes';

interface UseHierarchyImportProps {
  onHierarchyUpdate: (newHierarchy: HierarchyNode[]) => void;
  onEnvironmentChange: (newId: string) => void;
  availableIDs: string[];
}

export const useHierarchyImport = ({
  onHierarchyUpdate,
  onEnvironmentChange,
  availableIDs,
}: UseHierarchyImportProps) => {
  const [stagedHierarchyData, setStagedHierarchyData] = useState<HierarchyNode[] | null>(null);
  const [importErrorMessage, setImportErrorMessage] = useState<string | null>(null);

  const handleImportHierarchy = (file: File) => {
    setStagedHierarchyData(null);
    setImportErrorMessage("Reading file...");

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const fullImportedJson = JSON.parse(content);

        let hierarchyArray: HierarchyNode[] = [];

        if (Array.isArray(fullImportedJson) && fullImportedJson.length > 0) {
          hierarchyArray = fullImportedJson as HierarchyNode[];
        } 
        else if (
          fullImportedJson && 
          typeof fullImportedJson === 'object' && 
          'hierarchies' in fullImportedJson &&
          fullImportedJson.hierarchies
        ) {
          const hierarchyKeys = Object.keys(fullImportedJson.hierarchies);
          if (hierarchyKeys.length > 0) {
            const firstKey = hierarchyKeys[0];
            const envData = fullImportedJson.hierarchies[firstKey];
            if (Array.isArray(envData)) {
              hierarchyArray = envData as HierarchyNode[];
            }
          }
        } 
        else {
          throw new Error("File must contain a hierarchy array or a valid wrapper with 'hierarchies'.");
        }

        if (hierarchyArray.length === 0) {
          throw new Error("No hierarchy data found in the file.");
        }

        if (!validateImportedHierarchy(hierarchyArray)) {
          const errorMessage = `Import failed: Invalid Hierarchy ID found. Check node numbering (e.g., 1.2.1 is expected) and ensure the root ID is '1'.`;
          setImportErrorMessage(errorMessage);
          return;
        }

        setImportErrorMessage("Import successful! Click 'Apply New Hierarchy' to activate.");
        setStagedHierarchyData(hierarchyArray);

      } catch (error) {
        setImportErrorMessage(`Import Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };
    reader.readAsText(file);
  };

  const handleApplyImport = () => {
    if (!stagedHierarchyData) return;

    const newEnvironmentID = `IMPORTED-${Date.now()}`;
    onHierarchyUpdate(stagedHierarchyData);
    setStagedHierarchyData(null);
    setImportErrorMessage(null);
    onEnvironmentChange(newEnvironmentID);
    if (!availableIDs.includes(newEnvironmentID)) {
      availableIDs.push(newEnvironmentID);
    }
  };

  return {
    stagedHierarchyData,
    importErrorMessage,
    isStagingReady: !!stagedHierarchyData,
    handleImportHierarchy,
    handleApplyImport,
    clearImportError: () => setImportErrorMessage(null),
  };
};