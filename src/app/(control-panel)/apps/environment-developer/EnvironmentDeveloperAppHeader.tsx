'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import StorageIcon from '@mui/icons-material/Storage';

// Menu Icons
import FolderOpenIcon from '@mui/icons-material/FolderOpenOutlined';
import DescriptionIcon from '@mui/icons-material/DescriptionOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToAppOutlined';
import UndoIcon from '@mui/icons-material/UndoOutlined';
import RedoIcon from '@mui/icons-material/RedoOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopyOutlined';
import ContentCutIcon from '@mui/icons-material/ContentCutOutlined';
import ContentPasteIcon from '@mui/icons-material/ContentPasteOutlined';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebarOutlined';
import ZoomInIcon from '@mui/icons-material/ZoomInOutlined';
import ZoomOutIcon from '@mui/icons-material/ZoomOutOutlined';
import FullscreenIcon from '@mui/icons-material/FullscreenOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import BuildIcon from '@mui/icons-material/BuildOutlined';
import ExtensionIcon from '@mui/icons-material/ExtensionOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlineOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';

import { useEnvironment } from './hooks/useEnvironment';
import Link from 'next/link';

interface HierarchyDeveloperAppHeaderProps {
  onImportHierarchy: (file: File) => void;
  isStagingReady: boolean;
  onApplyImport: () => void;
  importErrorMessage: string | null;
}

export default function HierarchyDeveloperAppHeader({
  onImportHierarchy,
  isStagingReady,
  onApplyImport,
  importErrorMessage,
}: HierarchyDeveloperAppHeaderProps) {
  const {
    environments,
    activeEnvId,
    switchEnvironment,
    createEnvironment,
    saveCurrent,
    exportEnvironment,
  } = useEnvironment();

  // === Menu State ===
  const [fileAnchor, setFileAnchor] = useState<null | HTMLElement>(null);
  const [editAnchor, setEditAnchor] = useState<null | HTMLElement>(null);
  const [viewAnchor, setViewAnchor] = useState<null | HTMLElement>(null);
  const [toolsAnchor, setToolsAnchor] = useState<null | HTMLElement>(null);
  const [helpAnchor, setHelpAnchor] = useState<null | HTMLElement>(null);

  const openMenu = (setter: React.Dispatch<React.SetStateAction<null | HTMLElement>>) =>
    (event: React.MouseEvent<HTMLButtonElement>) => setter(event.currentTarget);

  const closeMenu = (setter: React.Dispatch<React.SetStateAction<null | HTMLElement>>) => () =>
    setter(null);

  // === Handlers ===
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImportHierarchy(file);
    e.target.value = '';
  };

  const handleNew = () => {
    const name = prompt('Environment name:', 'New Environment');
    if (name?.trim()) createEnvironment(name.trim());
  };

  const handleSave = () => {
    saveCurrent();
    alert('Saved!');
  };

  const handleExport = () => {
    if (!activeEnvId) return;
    const url = exportEnvironment(activeEnvId);
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = `${environments.find(e => e.id === activeEnvId)?.name || 'env'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCloseHelpMenu = () => {
    setHelpAnchor(null);
  };

  return (
    <>
      {/* === TOP MENU BAR (File, Edit, View, Tools, Help) === */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          px: 2,
          py: 0.5,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          fontSize: '0.875rem',
        }}
      >
        <Button size="small" onClick={openMenu(setFileAnchor)}>
          File
        </Button>
        <Menu anchorEl={fileAnchor} open={Boolean(fileAnchor)} onClose={closeMenu(setFileAnchor)}>
          <MenuItem onClick={closeMenu(setFileAnchor)}><AddIcon fontSize="small" sx={{ mr: 1 }} /> New Environment</MenuItem>
          <MenuItem onClick={closeMenu(setFileAnchor)} component="label">
            <FolderOpenIcon fontSize="small" sx={{ mr: 1 }} /> Import Hierarchy...
            <input type="file" accept=".json" hidden onChange={handleFileChange} />
          </MenuItem>
          <MenuItem onClick={() => { closeMenu(setFileAnchor)(); handleSave(); }}>
            <SaveIcon fontSize="small" sx={{ mr: 1 }} /> Save
          </MenuItem>
          <MenuItem onClick={() => { closeMenu(setFileAnchor)(); handleExport(); }}>
            <DownloadIcon fontSize="small" sx={{ mr: 1 }} /> Export Environment
          </MenuItem>
          <MenuItem onClick={closeMenu(setFileAnchor)}><DescriptionIcon fontSize="small" sx={{ mr: 1 }} /> Export...</MenuItem>
          <MenuItem onClick={closeMenu(setFileAnchor)}><ExitToAppIcon fontSize="small" sx={{ mr: 1 }} /> Exit</MenuItem>
        </Menu>

        <Button size="small" onClick={openMenu(setEditAnchor)}>
          Edit
        </Button>
        <Menu anchorEl={editAnchor} open={Boolean(editAnchor)} onClose={closeMenu(setEditAnchor)}>
          <MenuItem onClick={closeMenu(setEditAnchor)}><UndoIcon fontSize="small" sx={{ mr: 1 }} /> Undo</MenuItem>
          <MenuItem onClick={closeMenu(setEditAnchor)}><RedoIcon fontSize="small" sx={{ mr: 1 }} /> Redo</MenuItem>
          <MenuItem onClick={closeMenu(setEditAnchor)}><ContentCutIcon fontSize="small" sx={{ mr: 1 }} /> Cut</MenuItem>
          <MenuItem onClick={closeMenu(setEditAnchor)}><ContentCopyIcon fontSize="small" sx={{ mr: 1 }} /> Copy</MenuItem>
          <MenuItem onClick={closeMenu(setEditAnchor)}><ContentPasteIcon fontSize="small" sx={{ mr: 1 }} /> Paste</MenuItem>
        </Menu>

        <Button size="small" onClick={openMenu(setViewAnchor)}>
          View
        </Button>
        <Menu anchorEl={viewAnchor} open={Boolean(viewAnchor)} onClose={closeMenu(setViewAnchor)}>
          <MenuItem onClick={closeMenu(setViewAnchor)}><VisibilityIcon fontSize="small" sx={{ mr: 1 }} /> Toggle Sidebar</MenuItem>
          <MenuItem onClick={closeMenu(setViewAnchor)}><ViewSidebarIcon fontSize="small" sx={{ mr: 1 }} /> Explorer</MenuItem>
          <MenuItem onClick={closeMenu(setViewAnchor)}><ZoomInIcon fontSize="small" sx={{ mr: 1 }} /> Zoom In</MenuItem>
          <MenuItem onClick={closeMenu(setViewAnchor)}><ZoomOutIcon fontSize="small" sx={{ mr: 1 }} /> Zoom Out</MenuItem>
          <MenuItem onClick={closeMenu(setViewAnchor)}><FullscreenIcon fontSize="small" sx={{ mr: 1 }} /> Full Screen</MenuItem>
        </Menu>

        <Button size="small" onClick={openMenu(setToolsAnchor)}>
          Tools
        </Button>
        <Menu anchorEl={toolsAnchor} open={Boolean(toolsAnchor)} onClose={closeMenu(setToolsAnchor)}>
          <MenuItem onClick={closeMenu(setToolsAnchor)}><SettingsIcon fontSize="small" sx={{ mr: 1 }} /> Settings</MenuItem>
          <MenuItem onClick={closeMenu(setToolsAnchor)}><BuildIcon fontSize="small" sx={{ mr: 1 }} /> Build Project</MenuItem>
          <MenuItem onClick={closeMenu(setToolsAnchor)}><ExtensionIcon fontSize="small" sx={{ mr: 1 }} /> Extensions</MenuItem>
        </Menu>

        <Button size="small" onClick={openMenu(setHelpAnchor)}>
          Help
        </Button>
        <Menu anchorEl={helpAnchor} open={Boolean(helpAnchor)} onClose={handleCloseHelpMenu}>
          <MenuItem
            component={Link}
            href="/documentation/getting-started/introduction"
            onClick={handleCloseHelpMenu}
          >
            <HelpOutlineIcon fontSize="small" sx={{ mr: 1 }} /> Documentation
          </MenuItem>
          <MenuItem onClick={handleCloseHelpMenu}>
            <InfoIcon fontSize="small" sx={{ mr: 1 }} /> About
          </MenuItem>
        </Menu>
      </Box>

      {/* === ORIGINAL MAIN HEADER (kept exactly as before) === */}
      <Box
        sx={{
          mt: 3,
          p: 2,
          borderBottom: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          bgcolor: 'background.default',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box
            component="img"
            src="/assets/icons/brainoutlineblk.svg"
            alt="Brain Icon"
            sx={{
              width: '2rem',
              height: '2rem',
            }}
          />

          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 220 }}>
              <InputLabel>Active Environment</InputLabel>
              <Select
                value={activeEnvId || ''}
                onChange={e => switchEnvironment(e.target.value)}
                label="Active Environment"
              >
                {environments.map(env => (
                  <MenuItem key={env.id} value={env.id}>
                    {env.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              component="label"
              startIcon={<DownloadIcon />}
              size="small"
            >
              Export Environment
              <input type="file" accept=".json" hidden onChange={handleFileChange} />
            </Button>

            <Box sx={{ width: '1px', height: '32px', bgcolor: 'divider', mx: 1 }} />

            <Button
              component={Link}
              href="/apps/environment-developer/db-manager"
              variant="contained"
              size="small"
              startIcon={<StorageIcon />}
              sx={{ textTransform: 'none' }}
            >
              Manage Things
            </Button>
          </Box>
        </Box>

        {importErrorMessage && (
          <Box
            sx={{
              bgcolor: 'error.light',
              color: 'white',
              p: 1,
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {importErrorMessage}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}