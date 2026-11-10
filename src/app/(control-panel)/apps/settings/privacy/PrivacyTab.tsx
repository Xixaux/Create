'use client';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import CreateSvgIcon from '@create/core/CreateSvgIcon';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Chip } from '@mui/material';

/**
 * Custom Type Definitions for the dynamic object list
 */
type Visibility = 'Public' | 'Me Only' | 'Invite';
type ObjectItem = {
    id: string;
    name: string;
    icon: string;
    visibility: Visibility;
    invitedUsers: string[];
};

// --- Updated Mock Data ---
const initialObjectList: ObjectItem[] = [
    { id: '1', name: 'Quantum Nexus', icon: 'heroicons-solid:cube', visibility: 'Me Only', invitedUsers: [] },
    { id: '3', name: 'Sovereign Map', icon: 'heroicons-solid:map', visibility: 'Invite', invitedUsers: ['alice@team.com', 'bob@team.com'] },
];

/**
 * Define the form data structure (removed hideCreatedObjects)
 */
type SettingsFormType = {
    isAgiPublic: boolean;
    allowEhumansPublic: boolean;
    hideTerminatedUsers: boolean;
    hideCreatedUsers: boolean;
};

const defaultValues: SettingsFormType = {
    isAgiPublic: false,
    allowEhumansPublic: false,
    hideTerminatedUsers: true,
    hideCreatedUsers: false,
};

const schema = z.object({
    isAgiPublic: z.boolean(),
    allowEhumansPublic: z.boolean(),
    hideTerminatedUsers: z.boolean(),
    hideCreatedUsers: z.boolean(),
});

function PrivacyTab() {
    const [objects, setObjects] = useState<ObjectItem[]>(initialObjectList);
    const [userToInvite, setUserToInvite] = useState('');
    const [selectedObjectForInvite, setSelectedObjectForInvite] = useState<ObjectItem | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const { control, getValues } = useForm<SettingsFormType>({
        mode: 'onChange',
        defaultValues,
        resolver: zodResolver(schema),
    });

    const handleVisibilityChange = (id: string, event: SelectChangeEvent<Visibility>) => {
        setObjects(prev => 
            prev.map(obj => 
                obj.id === id ? { ...obj, visibility: event.target.value as Visibility } : obj
            )
        );
        
        if (event.target.value === 'Invite') {
            const selected = objects.find(obj => obj.id === id);
            if (selected) {
                setSelectedObjectForInvite(selected);
                setDialogOpen(true);
            }
        }
    };
    
    const handleAddInvite = () => {
        if (!selectedObjectForInvite || !userToInvite.trim()) return;
        
        const email = userToInvite.trim().toLowerCase();
        
        setObjects(prev => 
            prev.map(obj => 
                obj.id === selectedObjectForInvite.id
                    ? { ...obj, invitedUsers: [...new Set([...obj.invitedUsers, email])] }
                    : obj
            )
        );
        setUserToInvite('');
        setSelectedObjectForInvite(prev => prev ? { ...prev, invitedUsers: [...new Set([...prev.invitedUsers, email])] } : null);
    };

    const handleRemoveInvite = (user: string) => {
        if (!selectedObjectForInvite) return;
        
        setObjects(prev => 
            prev.map(obj => 
                obj.id === selectedObjectForInvite.id
                    ? { ...obj, invitedUsers: obj.invitedUsers.filter(u => u !== user) }
                    : obj
            )
        );
        setSelectedObjectForInvite(prev => prev ? { ...prev, invitedUsers: prev.invitedUsers.filter(u => u !== user) } : null);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setUserToInvite('');
        setSelectedObjectForInvite(null);
    };
    
    const handleSaveAll = () => {
        const formData = getValues();
        const fullData = {
            ...formData,
            objectVisibilityList: objects
        };
        console.log("Saving all privacy settings:", fullData);
        alert("Settings saved! Check console for full payload.");
    }
    
    return (
        <div className="flex flex-col p-16 sm:p-24 w-full max-w-5xl">
            {/* DYNAMIC OBJECT VISIBILITY SECTION */}
            <Typography variant="h5" className="mb-4">
                Select Object Visibility
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mb-6">
                Set granular visibility for your custom items. Selecting 'Invite' allows you to specify collaborators.
            </Typography>
            
            <List className="border rounded-lg p-0 bg-gray-50 dark:bg-gray-800">
                {objects.map(obj => (
                    <ListItem 
                        key={obj.id} 
                        secondaryAction={
                            <Box className="flex items-center space-x-2">
                                <Select
                                    value={obj.visibility}
                                    onChange={(e) => handleVisibilityChange(obj.id, e)}
                                    size="small"
                                >
                                    <MenuItem value="Public">Public</MenuItem>
                                    <MenuItem value="Me Only">Me Only</MenuItem>
                                    <MenuItem value="Invite">Invite</MenuItem>
                                </Select>
                                
                                {(obj.visibility === 'Invite' || obj.invitedUsers.length > 0) && (
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() => {
                                            setSelectedObjectForInvite(obj);
                                            setDialogOpen(true);
                                        }}
                                    >
                                        {obj.invitedUsers.length > 0 ? `Invited (${obj.invitedUsers.length})` : 'Invite Users'}
                                    </Button>
                                )}
                            </Box>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <CreateSvgIcon size={20}>{obj.icon}</CreateSvgIcon>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={obj.name}
                            secondary={`Current status: ${obj.visibility}`}
                        />
                    </ListItem>
                ))}
            </List>

            <Divider className="my-12" />
            
            <Button variant="contained" color="secondary" onClick={handleSaveAll} className="w-full sm:w-auto self-end">
                Save All Privacy Settings
            </Button>

            {/* INVITE USERS DIALOG */}
            <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
                <DialogTitle>Invite Users to {selectedObjectForInvite?.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText className="mb-4">
                        Enter the email address of the user you wish to invite to view this object.
                    </DialogContentText>
                    
                    <Box className="flex gap-2 mb-4">
                        <TextField
                            autoFocus
                            label="User Email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={userToInvite}
                            onChange={(e) => setUserToInvite(e.target.value)}
                        />
                        <Button onClick={handleAddInvite} color="primary" variant="contained" disabled={!userToInvite.includes('@')}>
                            Add
                        </Button>
                    </Box>
                    
                    <Typography variant="subtitle2" className="mt-4 mb-2">
                        Currently Invited Users:
                    </Typography>
                    <Box className="flex flex-wrap gap-2 p-2 border rounded min-h-[40px]">
                        {selectedObjectForInvite?.invitedUsers.length === 0 ? (
                            <Typography variant="body2" color="text.secondary">No users invited yet.</Typography>
                        ) : (
                            selectedObjectForInvite?.invitedUsers.map(user => (
                                <Chip
                                    key={user}
                                    label={user}
                                    onDelete={() => handleRemoveInvite(user)}
                                    color="primary"
                                    variant="outlined"
                                />
                            ))
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="inherit">
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PrivacyTab;