'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { HierarchyNode } from '../environmentTypes';
import { getFullPath } from '../environmentTypes';

interface ThingInfoBoxProps {
  node: HierarchyNode;
  hierarchy: HierarchyNode[];
}

export default function ThingInfoBox({ node, hierarchy }: ThingInfoBoxProps) {
  const fullPath = getFullPath(node.id, hierarchy);
  const parentId = node.metadata?.parentFolderId || 
    (node.id.includes('.') ? node.id.split('.').slice(0, -1).join('.') : null);
  const category = node.isFolder ? 'Folder' : 'File';
  const attributes = node.metadata?.attributes;

  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant="subtitle2" fontWeight={400} color="primary" sx={{ fontSize: '0.9rem' }}>
        {node.name}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
        {fullPath || '—'}
      </Typography>

      <Box sx={{ mt: 1, pl: 1 }}>
        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'secondary.main', fontWeight: 500, fontSize: '0.75rem', display: 'block' }}>
          Node ID: {node.id}
        </Typography>
        {parentId && (
          <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'secondary.main', fontWeight: 500, fontSize: '0.75rem', display: 'block' }}>
            Node Hierarchy ID: {parentId}
          </Typography>
        )}
        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'secondary.main', fontWeight: 500, fontSize: '0.75rem', display: 'block' }}>
          Category: {category}
        </Typography>

        {/* === ASSIGNED TRAITS (Objects like color: { name, id }) === */}
        {attributes && Object.keys(attributes).some(k => 
          typeof attributes[k] === 'object' && attributes[k] !== null && !['CreateTime', 'User', 'AccessLevel'].includes(k)
        ) && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>
              Assigned Traits:
            </Typography>
            {Object.entries(attributes)
              .filter(([, value]) => typeof value === 'object' && value !== null)
              .map(([key, trait]: [string, any]) => (
                <Typography
                  key={key}
                  variant="caption"
                  sx={{ display: 'block', fontFamily: 'monospace', fontSize: '0.75rem', color: 'secondary.main' }}
                >
                  {key}: {trait.name || 'Unnamed'} (ID: {trait.id || '—'})
                </Typography>
              ))}
          </Box>
        )}

        {/* === PATH-SPECIFIC / GENERATED TRAITS (Strings) === */}
        {attributes && Object.keys(attributes).some(k => 
          !['CreateTime', 'User', 'AccessLevel'].includes(k) && typeof attributes[k] !== 'object'
        ) && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>
              Generated Traits:
            </Typography>
            {['Age', 'Location', 'Profession'].map(key => (
              attributes[key] !== undefined && (
                <Typography
                  key={key}
                  variant="caption"
                  sx={{ display: 'block', fontFamily: 'monospace', fontSize: '0.75rem', color: 'secondary.main' }}
                >
                  {key}: {String(attributes[key])}
                </Typography>
              )
            ))}
            {/* Any other string-based path-specific attributes */}
            {Object.entries(attributes)
              .filter(([key]) => 
                !['CreateTime', 'User', 'AccessLevel', 'Age', 'Location', 'Profession'].includes(key) && 
                typeof attributes[key] !== 'object'
              )
              .map(([key, value]) => (
                <Typography
                  key={key}
                  variant="caption"
                  sx={{ display: 'block', fontFamily: 'monospace', fontSize: '0.75rem', color: 'secondary.main' }}
                >
                  {key}: {String(value)}
                </Typography>
              ))}
          </Box>
        )}

        {/* === FALLBACK: No Generated Traits === */}
        {(!attributes || !Object.keys(attributes).some(k => 
          !['CreateTime', 'User', 'AccessLevel'].includes(k) && typeof attributes[k] !== 'object'
        )) && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>
              Generated Traits:
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontStyle: 'italic', fontSize: '0.75rem' }}>
              No traits generated
            </Typography>
          </Box>
        )}

        {/* === AUTHOR OVERVIEW === */}
        {attributes && ['CreateTime', 'User', 'AccessLevel'].some(k => attributes[k] !== undefined) && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>
              Author Overview
            </Typography>
            {['CreateTime', 'User', 'AccessLevel'].map(key => (
              attributes[key] !== undefined && (
                <Typography
                  key={key}
                  variant="caption"
                  sx={{ display: 'block', fontFamily: 'monospace', fontSize: '0.75rem', color: 'secondary.main' }}
                >
                  {key}: {String(attributes[key])}
                </Typography>
              )
            ))}
          </Box>
        )}

        {/* === PATH OPTIONS (Legacy Debug) === */}
        {node.metadata?.pathOptions && Object.keys(node.metadata.pathOptions).length > 0 && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>
              Path Options:
            </Typography>
            {Object.entries(node.metadata.pathOptions).map(([key, value]) => (
              <Typography
                key={key}
                variant="caption"
                sx={{ display: 'block', fontFamily: 'monospace', fontSize: '0.75rem', color: 'secondary.main' }}
              >
                {key}: {typeof value === 'object' ? JSON.stringify(value) : String(value)}
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}