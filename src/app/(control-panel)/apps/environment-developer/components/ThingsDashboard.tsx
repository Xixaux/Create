'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';  

export interface PinnedNode {
  id: string;
  name: string;
  fullPath: string;
  createdAt: Date;
  parentFolderId: string;
  attributes?: {
    CreateTime: string;
    User: string;
    AccessLevel: string;
    nodeDefinition?: Record<string, string>;
    assignedTraits?: Record<string, any>;
    actionName?: string;
    calculationName?: string;
    logicName?: string;
    [key: string]: any;
  };
}

interface ThingsDashboardProps {
  pinnedNodes: PinnedNode[];
  virtualizedPhysicalObjects: PinnedNode[];
  definedActions: PinnedNode[];
  selectedPinnedNode: PinnedNode | null;
  onSelectNode: (node: PinnedNode) => void;
  onDeleteNode: (node: PinnedNode) => (e: React.MouseEvent) => void;
}

const ThingsDashboard: React.FC<ThingsDashboardProps> = ({
  pinnedNodes,
  virtualizedPhysicalObjects,
  definedActions,
  selectedPinnedNode,
  onSelectNode,
  onDeleteNode,
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, height: 700, minHeight: 600 }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {}
        <Box
          sx={{
            flex: 1,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '8px',
            p: 2,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 500, color: '#2f3031ff', mb: 1.5, letterSpacing: '0.5px' }}>
            Thing Library
          </Typography>
          <Box sx={{ flex: 1, overflow: 'auto', pr: 1 }}>
            {pinnedNodes.length === 0 ? (
              <Typography sx={{ color: 'text.disabled', fontStyle: 'italic', textAlign: 'center', mt: 4, opacity: 0.6 }}>
                No things created yet.
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {pinnedNodes.map((node, index) => (
                  <Box
                    key={node.id}
                    onClick={() => onSelectNode(node)}
                    sx={{
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      position: 'relative',
                      bgcolor: index % 2 === 1 ? 'rgba(0, 208, 255, 0.06)' : 'transparent',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 16px rgba(0, 208, 255, 0.2)',
                        bgcolor: index % 2 === 1 ? 'rgba(0, 208, 255, 0.12)' : 'rgba(0, 208, 255, 0.08)',
                      },
                      '&::before': index % 2 === 1 && {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '4px',
                        background: 'linear-gradient(180deg, #00D0FF 0%, #00A4EF 100%)',
                        borderRadius: '0 4px 4px 0',
                        opacity: 0.7,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        p: 1.2,
                        pr: 6,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1,
                        bgcolor: selectedPinnedNode?.id === node.id ? 'rgba(0, 164, 239, 0.15)' : 'transparent',
                        border: selectedPinnedNode?.id === node.id ? '1px solid rgba(0, 164, 239, 0.4)' : '1px solid transparent',
                        borderRadius: '8px',
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 500, color: '#00A4EF', fontSize: '0.94rem', lineHeight: 1.25 }}>
                          {node.name}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.72rem', opacity: 0.85, display: 'block', mt: 0.2 }}>
                          {node.fullPath}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={onDeleteNode(node)}
                        sx={{
                          color: '#d32f2f',
                          p: 0.7,
                          opacity: 0.9,
                          '&:hover': {
                            bgcolor: 'rgba(0, 208, 255, 0.2)',
                            color: '#00FFFF',
                            transform: 'scale(1.1)',
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>

        {/* Defined Virtualized Objects */}
        <Box
          sx={{
            flex: 1,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '8px',
            p: 2,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 500, color: '#222222', mb: 1.5, letterSpacing: '0.5px' }}>
            Defined Virtualized Objects
          </Typography>
          <Box sx={{ flex: 1, overflow: 'auto', pr: 1 }}>
            {virtualizedPhysicalObjects.length === 0 ? (
              <Typography sx={{ color: 'text.disabled', fontStyle: 'italic', textAlign: 'center', mt: 4, opacity: 0.6 }}>
                No virtualized objects.
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {virtualizedPhysicalObjects.map((node, index) => {
                  const location = node.attributes?.assignedTraits?.location;
                  const x = location?.x ?? '0';
                  const y = location?.y ?? '0';
                  const z = location?.z ?? '0';
                  const hasCoords = x !== '0' || y !== '0' || z !== '0';

                  return (
                    <Box
                      key={node.id}
                      onClick={() => onSelectNode(node)}
                      sx={{
                        borderRadius: '8px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        position: 'relative',
                        bgcolor: index % 2 === 1 ? 'rgba(0, 208, 255, 0.06)' : 'transparent',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 16px rgba(0, 208, 255, 0.2)',
                          bgcolor: index % 2 === 1 ? 'rgba(0, 208, 255, 0.12)' : 'rgba(0, 208, 255, 0.08)',
                        },
                        '&::before': index % 2 === 1 && {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: '4px',
                          background: 'linear-gradient(180deg, #00D0FF 0%, #00A4EF 100%)',
                          borderRadius: '0 4px 4px 0',
                          opacity: 0.7,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.2,
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 1,
                          bgcolor: selectedPinnedNode?.id === node.id ? 'rgba(0, 164, 239, 0.15)' : 'transparent',
                          border: selectedPinnedNode?.id === node.id ? '1px solid rgba(0, 164, 239, 0.4)' : '1px solid transparent',
                          borderRadius: '8px',
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontWeight: 500, color: '#00A4EF', fontSize: '0.94rem', lineHeight: 1.25 }}>
                            {node.name}
                          </Typography>
                          <Typography sx={{ color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.72rem', opacity: 0.85, display: 'block', mt: 0.2 }}>
                            {node.fullPath}
                          </Typography>
                          {hasCoords && (
                            <Typography sx={{ color: '#00D0FF', fontFamily: 'monospace', fontSize: '0.70rem', opacity: 0.9, display: 'block', mt: 0.3, fontWeight: 500 }}>
                              X: {x}  Y: {y}  Z: {z}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>
        </Box>

        {/* Defined Abstracts */}
        <Box
          sx={{
            flex: 1,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '8px',
            p: 2,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 500, color: '#222222', mb: 1.5, letterSpacing: '0.5px' }}>
            Defined Abstracts
          </Typography>
          <Box sx={{ flex: 1, overflow: 'auto', pr: 1 }}>
            {definedActions.length === 0 ? (
              <Typography sx={{ color: 'text.disabled', fontStyle: 'italic', textAlign: 'center', mt: 4, opacity: 0.6 }}>
                No defined actions.
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {definedActions.map((node, index) => (
                  <Box
                    key={node.id}
                    onClick={() => onSelectNode(node)}
                    sx={{
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      position: 'relative',
                      bgcolor: index % 2 === 1 ? 'rgba(0, 208, 255, 0.06)' : 'transparent',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 16px rgba(0, 208, 255, 0.2)',
                        bgcolor: index % 2 === 1 ? 'rgba(0, 208, 255, 0.12)' : 'rgba(0, 208, 255, 0.08)',
                      },
                      '&::before': index % 2 === 1 && {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '4px',
                        background: 'linear-gradient(180deg, #00D0FF 0%, #00A4EF 100%)',
                        borderRadius: '0 4px 4px 0',
                        opacity: 0.7,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        p: 1.2,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1,
                        bgcolor: selectedPinnedNode?.id === node.id ? 'rgba(0, 164, 239, 0.15)' : 'transparent',
                        border: selectedPinnedNode?.id === node.id ? '1px solid rgba(0, 164, 239, 0.4)' : '1px solid transparent',
                        borderRadius: '8px',
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 500, color: '#00A4EF', fontSize: '0.94rem', lineHeight: 1.25 }}>
                          {node.name}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.72rem', opacity: 0.85, display: 'block', mt: 0.2 }}>
                          {node.fullPath}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>

       {/* Thing Properties Panel - Updated Generic Version */}
      <Box
        sx={{
          width: '400px',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '8px',
          p: 3,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 500, color: '#222222' }}>
            Thing Properties
          </Typography>
          <IconButton size="small" color="primary">
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>

        {selectedPinnedNode ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {/* Name & Path */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '1.1rem' }}>
                {selectedPinnedNode.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.8rem', mt: 0.5 }}
              >
                {selectedPinnedNode.fullPath}
              </Typography>
            </Box>

            {/* Category */}
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                Category
              </Typography>
              <Chip
                label={(selectedPinnedNode.parentFolderId || '').startsWith('1.') ? 'Physical' : 'Abstract'}
                size="small"
                color={(selectedPinnedNode.parentFolderId || '').startsWith('1.') ? 'success' : 'info'}
                sx={{ ml: 1, fontSize: '0.75rem' }}
              />
            </Box>

            {/* Node Definition */}
            {selectedPinnedNode.attributes?.nodeDefinition && Object.keys(selectedPinnedNode.attributes.nodeDefinition).length > 0 && (
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                  Node Role Definition
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8, pl: 1 }}>
                  {Object.entries(selectedPinnedNode.attributes.nodeDefinition).map(([key, value]) => (
                    <Typography
                      key={key}
                      variant="body2"
                      sx={{ fontFamily: 'monospace', fontSize: '0.82rem', color: '#00A4EF' }}
                    >
                      <strong>{key.toUpperCase()}:</strong> {String(value)}
                    </Typography>
                  ))}
                </Box>
              </Box>
            )}

            {/* Assigned Traits - Fully Generic & Handles Binary Display */}
            {selectedPinnedNode.attributes?.assignedTraits && Object.keys(selectedPinnedNode.attributes.assignedTraits).length > 0 && (
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                  Assigned Symbolic Traits
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                  {Object.entries(selectedPinnedNode.attributes.assignedTraits).map(([pathId, trait]: [string, any]) => {
                    // Skip null/undefined entries (used for clearing)
                    if (!trait) return null;

                    const displayLabel = trait.display || 
                      (trait.xName && trait.yName ? `${trait.xName} ↔ ${trait.yName}` : null) ||
                      trait.name || 
                      'Unnamed Trait';

                    return (
                      <Box
                        key={pathId}
                        sx={{
                          bgcolor: 'rgba(0, 164, 239, 0.08)',
                          borderRadius: '8px',
                          p: 1.5,
                          border: '1px solid rgba(0, 164, 239, 0.2)',
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 500, color: '#00A4EF', fontSize: '0.88rem' }}>
                          {displayLabel}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace', mt: 0.5 }}>
                          Path: {pathId}
                        </Typography>
                        {trait.xId && (
                          <Typography variant="caption" sx={{ color: 'success.main', fontFamily: 'monospace' }}>
                            X → {trait.xName || 'Unnamed'} ({trait.xId})
                          </Typography>
                        )}
                        {trait.yId && (
                          <Typography variant="caption" sx={{ color: 'error.main', fontFamily: 'monospace' }}>
                            Y → {trait.yName || 'Unnamed'} ({trait.yId})
                          </Typography>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}

            {/* Action / Calculation / Logic */}
            {selectedPinnedNode.attributes?.actionName && (
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#00A4EF' }}>
                  Assigned Action
                </Typography>
                <Chip label={selectedPinnedNode.attributes.actionName} color="primary" sx={{ mt: 0.8 }} />
              </Box>
            )}

            {selectedPinnedNode.attributes?.calculationName && (
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#0288d1' }}>
                  Calculation
                </Typography>
                <Chip label={selectedPinnedNode.attributes.calculationName} color="info" sx={{ mt: 0.8 }} />
              </Box>
            )}

            {selectedPinnedNode.attributes?.logicName && (
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2e7d32' }}>
                  Logic
                </Typography>
                <Chip label={selectedPinnedNode.attributes.logicName} color="success" sx={{ mt: 0.8 }} />
              </Box>
            )}

            {/* Author Metadata */}
            {selectedPinnedNode.attributes && (
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                  Created By
                </Typography>
                <Box sx={{ pl: 1, display: 'flex', flexDirection: 'column', gap: 0.6 }}>
                  {(['CreateTime', 'User', 'AccessLevel'] as const).map((key) => {
                    const value = selectedPinnedNode.attributes?.[key];
                    if (value === undefined) return null;

                    let displayValue = String(value);
                    if (key === 'CreateTime') {
                      const date = new Date(value);
                      displayValue = date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }) + ' at ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
                    }

                    return (
                      <Typography
                        key={key}
                        variant="body2"
                        sx={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'text.secondary' }}
                      >
                        <strong>{key}:</strong> {displayValue}
                      </Typography>
                    );
                  })}
                </Box>
              </Box>
            )}
          </Box>
        ) : (
          <Typography
            variant="body1"
            color="text.disabled"
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontStyle: 'italic',
            }}
          >
            Select a thing to view its properties
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ThingsDashboard;