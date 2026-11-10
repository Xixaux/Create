import Drawer from '@mui/material/Drawer';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import clsx from 'clsx';
import { ReactNode, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer/SwipeableDrawer';
import CreatePageSimpleSidebarContent from './CreatePageSimpleSidebarContent';
import useThemeMediaQuery from '../../hooks/useThemeMediaQuery';

/**
 * Props for the CreatePageSimpleSidebar component.
 */
type CreatePageSimpleSidebarProps = {
	open?: boolean;
	position?: SwipeableDrawerProps['anchor'];
	variant?: SwipeableDrawerProps['variant'];
	onClose?: () => void;
	children?: ReactNode;
	ref?: React.RefObject<{ toggleSidebar: (T: boolean) => void }>;
};

/**
 * The CreatePageSimpleSidebar component.
 */
function CreatePageSimpleSidebar(props: CreatePageSimpleSidebarProps) {
	const { open = true, position, variant, onClose = () => {}, ref } = props;

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const [isOpen, setIsOpen] = useState(open);

	useImperativeHandle(ref, () => ({
		toggleSidebar: handleToggleDrawer
	}));

	const handleToggleDrawer = useCallback((val: boolean) => {
		setIsOpen(val);
	}, []);

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
						root: clsx('CreatePageSimple-sidebarWrapper', variant),
						paper: clsx(
							'CreatePageSimple-sidebar',
							variant,
							position === 'left' ? 'CreatePageSimple-leftSidebar' : 'CreatePageSimple-rightSidebar',
							'max-w-full'
						)
					}}
					ModalProps={{
						keepMounted: true // Better open performance on mobile.
					}}
					// container={rootRef.current}
					BackdropProps={{
						classes: {
							root: 'CreatePageSimple-backdrop'
						}
					}}
					style={{ position: 'absolute' }}
				>
					<CreatePageSimpleSidebarContent {...props} />
				</SwipeableDrawer>
			)}
			{variant === 'permanent' && !isMobile && (
				<Drawer
					variant="permanent"
					anchor={position}
					className={clsx(
						'CreatePageSimple-sidebarWrapper',
						variant,
						isOpen ? 'opened' : 'closed',
						position === 'left' ? 'CreatePageSimple-leftSidebar' : 'CreatePageSimple-rightSidebar'
					)}
					open={isOpen}
					onClose={onClose}
					classes={{
						paper: clsx('CreatePageSimple-sidebar border-0', variant)
					}}
				>
					<CreatePageSimpleSidebarContent {...props} />
				</Drawer>
			)}
		</>
	);
}

export default CreatePageSimpleSidebar;
