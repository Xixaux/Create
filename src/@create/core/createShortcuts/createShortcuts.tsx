import { memo } from 'react';
import clsx from 'clsx';
import Box from '@mui/material/Box';

type CreateShortcutsProps = {
    className?: string;
    variant?: 'horizontal' | 'vertical';
};

/**
 * CreateShortcuts - Shortcuts removed, LanguageSwitcher kept. Left menu top bar left topbar
 */
function CreateShortcuts(props: CreateShortcutsProps) {
    const { className = '', variant = 'horizontal' } = props;

    return (
        <Box
            className={clsx(
                'flex shrink overflow-hidden items-center',
                variant === 'vertical' ? 'flex-col' : '',
                className
            )}
        >

        </Box>
    );
}

export default memo(CreateShortcuts);