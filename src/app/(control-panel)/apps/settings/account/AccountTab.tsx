'use client';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CreateSvgIcon from '@create/core/CreateSvgIcon';
import _ from 'lodash';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import { Box, Avatar, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const AvatarUploadContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: 150,
    height: 150,
    borderRadius: '50%',
    margin: '0 auto 20px auto',
    cursor: 'pointer',
    boxShadow: theme.shadows[4],
    transition: theme.transitions.create(['box-shadow'], { duration: 300 }),

    '&:hover': {
        boxShadow: theme.shadows[8],
    },
    
    '&:hover .avatar-overlay': {
        opacity: 1,
    },
}));

const Overlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 'inherit',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    transition: 'opacity 0.3s',
    color: 'white',
    pointerEvents: 'none',
}));

function ProfileAvatarUpload() {
    const [avatarUrl, setAvatarUrl] = useState('https://via.placeholder.com/150/0000FF/FFFFFF?text=P');
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const newAvatarUrl = URL.createObjectURL(file);
            setAvatarUrl(newAvatarUrl);
        }
    };

    return (
        <AvatarUploadContainer>
            <Button 
                component="label" 
                htmlFor="avatar-upload-input" 
                disableRipple 
                sx={{ p: 0, borderRadius: '50%', width: '100%', height: '100%' }}
            >
                <Avatar alt="Profile Avatar" src={avatarUrl} sx={{ width: 150, height: 150 }}>
                    P
                </Avatar>
                <Overlay className="avatar-overlay">
                    <PhotoCameraIcon sx={{ fontSize: 32, mb: 0.5 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        CHANGE
                    </Typography>
                </Overlay>
            </Button>
            <VisuallyHiddenInput 
                id="avatar-upload-input" 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
            />
        </AvatarUploadContainer>
    );
}

type FormType = {
    name: string;
    username: string;
    title: string;
    company: string;
    about: string;
    primaryUse: string;
    industry: string;
};

const defaultValues: FormType = {
    name: '',
    username: '',
    title: '',
    company: '',
    about: '',
    primaryUse: '',
    industry: ''
};

const useOptions = ['Personal Project', 'Work/Company Project', 'Education/Learning', 'Other'];
const industryOptions = ['Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Education', 'Other'];

const schema = z.object({
    name: z.string().nonempty('Name is required'),
    username: z.string().nonempty('Username is required'),
    title: z.string().nonempty('Title is required'),
    company: z.string().nonempty('Company is required'),
    about: z.string().nonempty('About is required'),
    primaryUse: z.string().nonempty('Primary Use is required'),
    industry: z.string().nonempty('Industry is required')
});

function AccountTab() {
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const { control, reset, handleSubmit, formState } = useForm<FormType>({
        defaultValues,
        mode: 'all',
        resolver: zodResolver(schema)
    });

    const { isValid, dirtyFields, errors } = formState;

    const accountCreationDate = '2024/05/15'; 

    async function onSubmit(formData: FormType) {
        try {
            const payload = {
                Name: formData.name,
                Username: formData.username,
                Title: formData.title,
                Company: formData.company,
                Notes: formData.about,
                PrimaryUse: formData.primaryUse,
                Industry: formData.industry,
            };
            const response = await fetch('http://localhost:5000/api/GeneralSettings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            setMessage({ type: 'success', text: 'Settings saved successfully!' });
        } catch (error) {
            console.error('Submission error:', error);
            setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
        }
    }

    return (
        <div className="w-full max-w-5xl">
            {message && (
                <Alert severity={message.type} className="mb-4">
                    {message.text}
                </Alert>
            )}
            
            <ProfileAvatarUpload />
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full">
                    <Typography className="text-xl">Profile</Typography>
                    <Typography color="text.secondary">
                        Following information is publicly displayed, be careful!
                    </Typography>
                </div>
                
                {/* Account Creation Date */}
                <div className="mt-8 grid w-full gap-6 sm:grid-cols-4">
                    <div className="sm:col-span-2">
                        <Box sx={{ p: '14px', border: 1, borderColor: 'divider', borderRadius: 1 }}>
                            <Typography variant="caption" color="text.secondary" display="block">
                                Account Creation Date
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                {accountCreationDate}
                            </Typography>
                        </Box>
                    </div>
                    <div className="sm:col-span-2" />
                </div>
                
                <div className="mt-8 grid w-full gap-6 sm:grid-cols-4">
                    {/* Primary Use */}
                    <div className="sm:col-span-2">
                        <Controller
                            control={control}
                            name="primaryUse"
                            render={({ field }) => (
                                <FormControl fullWidth variant="outlined" error={!!errors.primaryUse}>
                                    <InputLabel id="primary-use-label">Primary Use</InputLabel>
                                    <Select {...field} labelId="primary-use-label" label="Primary Use">
                                        {useOptions.map((option) => (
                                            <MenuItem key={option} value={option}>{option}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </div>
                    
                    {/* Industry */}
                    <div className="sm:col-span-2">
                        <Controller
                            control={control}
                            name="industry"
                            render={({ field }) => (
                                <FormControl fullWidth variant="outlined" error={!!errors.industry}>
                                    <InputLabel id="select-industry-label">Select Industry</InputLabel>
                                    <Select {...field} labelId="select-industry-label" label="Select Industry">
                                        {industryOptions.map((option) => (
                                            <MenuItem key={option} value={option}>{option}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </div>

                    {/* Profile Fields */}
                    <div className="sm:col-span-4">
                        <Controller control={control} name="name" render={({ field }) => (
                            <TextField {...field} label="Name" variant="outlined" required fullWidth
                                error={!!errors.name} helperText={errors?.name?.message}
                                InputProps={{ startAdornment: <InputAdornment position="start">
                                    <CreateSvgIcon size={20}>heroicons-solid:user-circle</CreateSvgIcon>
                                </InputAdornment> }}
                            />
                        )} />
                    </div>

                    <div className="sm:col-span-4">
                        <Controller control={control} name="username" render={({ field }) => (
                            <TextField {...field} label="Username" variant="outlined" required fullWidth
                                error={!!errors.username} helperText={errors?.username?.message}
                                InputProps={{ startAdornment: <InputAdornment position="start">
                                    <Typography color="text.secondary" className="italic">createtheme.com/</Typography>
                                </InputAdornment> }}
                            />
                        )} />
                    </div>

                    <div className="sm:col-span-2">
                        <Controller control={control} name="title" render={({ field }) => (
                            <TextField {...field} label="Title" variant="outlined" fullWidth
                                error={!!errors.title} helperText={errors?.title?.message}
                                InputProps={{ startAdornment: <InputAdornment position="start">
                                    <CreateSvgIcon size={20}>heroicons-solid:briefcase</CreateSvgIcon>
                                </InputAdornment> }}
                            />
                        )} />
                    </div>

                    <div className="sm:col-span-2">
                        <Controller control={control} name="company" render={({ field }) => (
                            <TextField {...field} label="Company" variant="outlined" fullWidth
                                error={!!errors.company} helperText={errors?.company?.message}
                                InputProps={{ startAdornment: <InputAdornment position="start">
                                    <CreateSvgIcon size={20}>heroicons-solid:building-office-2</CreateSvgIcon>
                                </InputAdornment> }}
                            />
                        )} />
                    </div>

                    <div className="sm:col-span-4">
                        <Controller control={control} name="about" render={({ field }) => (
                            <TextField {...field} label="Notes" variant="outlined" fullWidth multiline minRows={5} maxRows={10}
                                error={!!errors.about}
                                InputProps={{
                                    className: 'max-h-min h-min items-start',
                                    startAdornment: <InputAdornment className="mt-4" position="start">
                                        <CreateSvgIcon size={20}>heroicons-solid:bars-3-bottom-left</CreateSvgIcon>
                                    </InputAdornment>
                                }}
                                helperText="Brief description for your profile. Basic HTML and Emoji are allowed."
                            />
                        )} />
                    </div>
                </div>

                {/* Removed entire Personal Information section + 4 fields */}

                <Divider className="mb-10 mt-11 border-t" />
                <div className="flex items-center justify-end space-x-2">
                    <Button variant="outlined" disabled={_.isEmpty(dirtyFields)} onClick={() => reset(defaultValues)}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        disabled={_.isEmpty(dirtyFields) || !isValid}
                        type="submit"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default AccountTab;