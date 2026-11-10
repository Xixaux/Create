'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PathSpecificOptions from './PathSpecificOptions';

interface InheritedPathOptionsProps {
  contextNodeId: string;
  pathSpecificOptionNodes: Record<string, string[]>;
  pinnedNodes: any[];
  onUpdate: (data: any) => void;
}

export default function InheritedPathOptions({
  contextNodeId,
  pathSpecificOptionNodes,
  pinnedNodes,
  onUpdate,
}: InheritedPathOptionsProps) {
  const inheritedPaths = pathSpecificOptionNodes[contextNodeId] || [];

  if (inheritedPaths.length === 0) return null;

  return (
    <>
      {inheritedPaths.map((pathPrefix) => {
        const files = pinnedNodes.filter((node) =>
          node.id.startsWith('created_') &&
          node.parentFolderId.startsWith(pathPrefix + '.')
        );

        if (files.length === 0) {
          return (
            <Box key={pathPrefix} sx={{ mt: 2, opacity: 0.6 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                No options defined in {pathPrefix}
              </Typography>
            </Box>
          );
        }

        return (
          <Box key={pathPrefix} sx={{ mt: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 1 }}>
              Options from {pathPrefix}
            </Typography>
            {files.map((file) => {
              const fileNodeId = file.parentFolderId; // e.g., '2.3.1.5'
              return (
                <Box key={file.id} sx={{ mb: 2, pl: 2, borderLeft: '2px solid #00A4EF' }}>
                  <Typography variant="caption" sx={{ fontWeight: 500, color: 'secondary.main', mb: 1 }}>
                    {file.name} ({file.id})
                  </Typography>
                  <PathSpecificOptions
                    currentNodeId={fileNodeId}
                    onUpdate={(data) => {
                      onUpdate({
                        ...data,
                        sourceFileId: file.id,
                        sourceFileName: file.name,
                      });
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        );
      })}
    </>
  );
}