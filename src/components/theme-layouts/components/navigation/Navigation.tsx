'use client';

import CreateNavigation from '@create/core/CreateNavigation';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useAppDispatch } from 'src/store/hooks';
import useThemeMediaQuery from '@create/hooks/useThemeMediaQuery';
import { CreateNavigationProps } from '@create/core/CreateNavigation/CreateNavigation';
import { navbarCloseMobile } from '../navbar/navbarSlice';
import useNavigation from './hooks/useNavigation';

/**
 * Navigation
 */

type NavigationProps = Partial<CreateNavigationProps>;

function Navigation(props: NavigationProps) {
	const { className = '', layout = 'vertical', dense, active } = props;
	const { navigation } = useNavigation();

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const dispatch = useAppDispatch();

	return useMemo(() => {
		function handleItemClick() {
			if (isMobile) {
				dispatch(navbarCloseMobile());
			}
		}

		return (
			<CreateNavigation
				className={clsx('navigation flex-1', className)}
				navigation={navigation}
				layout={layout}
				dense={dense}
				active={active}
				onItemClick={handleItemClick}
				checkPermission
			/>
		);
	}, [dispatch, isMobile, navigation, active, className, dense, layout]);
}

export default Navigation;
