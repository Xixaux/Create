import Drawer from '@mui/material/Drawer';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import clsx from 'clsx';
import { useCallback, useEffect, useImperativeHandle, useState, ReactNode } from 'react';
import { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer/SwipeableDrawer';
import CreatePageCardedSidebarContent from './CreatePageCardedSidebarContent';
import useThemeMediaQuery from '../../hooks/useThemeMediaQuery';

/**
 * Props for the CreatePageCardedSidebar component.
 */
type CreatePageCardedSidebarProps = {
	open?: boolean;
	position?: SwipeableDrawerProps['anchor'];
	variant?: SwipeableDrawerProps['variant'];
	onClose?: () => void;
	children?: ReactNode;
	ref?: React.RefObject<{ toggleSidebar: (T: boolean) => void }>;
};

/**
 * The CreatePageCardedSidebar component is a sidebar for the CreatePageCarded component.
 */
function CreatePageCardedSidebar(props: CreatePageCardedSidebarProps) {
	const { open = true, position, variant, onClose = () => {}, ref } = props;

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const [isOpen, setIsOpen] = useState(open);

	const handleToggleDrawer = useCallback((val: boolean) => {
		setIsOpen(val);
	}, []);

	useImperativeHandle(ref, () => ({
		toggleSidebar: handleToggleDrawer
	}));

	useEffect(() => {
		handleToggleDrawer(open);
	}, [handleToggleDrawer, open]);

	return (
		<>
			{((variant === 'permanent' && isMobile) || variant !== 'permanent') && (
				<SwipeableDrawer
					variant="temporary"
					anchor={position}
					open={isOpen}
					onOpen={() => {}}
					onClose={() => onClose()}
					disableSwipeToOpen
					classes={{
						root: clsx('CreatePageCarded-sidebarWrapper', variant),
						paper: clsx(
							'CreatePageCarded-sidebar',
							variant,
							position === 'left' ? 'CreatePageCarded-leftSidebar' : 'CreatePageCarded-rightSidebar'
						)
					}}
					ModalProps={{
						keepMounted: true // Better open performance on mobile.
					}}
					BackdropProps={{
						classes: {
							root: 'CreatePageCarded-backdrop'
						}
					}}
					style={{ position: 'absolute' }}
				>
					<CreatePageCardedSidebarContent {...props} />
				</SwipeableDrawer>
			)}
			{variant === 'permanent' && !isMobile && (
				<Drawer
					variant="permanent"
					anchor={position}
					className={clsx(
						'CreatePageCarded-sidebarWrapper',
						variant,
						isOpen ? 'opened' : 'closed',
						position === 'left' ? 'CreatePageCarded-leftSidebar' : 'CreatePageCarded-rightSidebar'
					)}
					open={isOpen}
					onClose={onClose}
					classes={{
						paper: clsx('CreatePageCarded-sidebar', variant)
					}}
				>
					<CreatePageCardedSidebarContent {...props} />
				</Drawer>
			)}
		</>
	);
}

export default CreatePageCardedSidebar;
