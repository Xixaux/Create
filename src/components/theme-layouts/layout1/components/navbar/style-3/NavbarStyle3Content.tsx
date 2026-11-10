import CreateScrollbars from '@create/core/CreateScrollbars';
import { styled } from '@mui/material/styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';
import { useAppDispatch } from 'src/store/hooks';
import CreateNavigation from '@create/core/CreateNavigation';
import useThemeMediaQuery from '@create/hooks/useThemeMediaQuery';
import isUrlInChildren from '@create/core/CreateNavigation/isUrlInChildren';
import { Theme } from '@mui/system';
import { CreateNavItemType } from '@create/core/CreateNavigation/types/CreateNavItemType';
import { navbarCloseMobile } from 'src/components/theme-layouts/components/navbar/navbarSlice';
import UserMenu from 'src/components/theme-layouts/components/UserMenu';
import usePathname from '@create/hooks/usePathname';
import useNavigation from '@/components/theme-layouts/components/navigation/hooks/useNavigation';

const Root = styled('div')(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	color: theme.palette.text.primary
}));

type StyledPanelProps = {
	theme?: Theme;
	opened?: boolean;
};

const StyledPanel = styled(CreateScrollbars)<StyledPanelProps>(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	color: theme.palette.text.primary,
	transition: theme.transitions.create(['opacity'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.shortest
	}),
	opacity: 0,
	pointerEvents: 'none',
	minHeight: 0,
	variants: [
		{
			props: ({ opened }) => opened,
			style: {
				opacity: 1,
				pointerEvents: 'initial'
			}
		}
	]
}));

/**
 * Check if the item needs to be opened.
 */
function needsToBeOpened(pathname: string, item: CreateNavItemType) {
	return pathname && isUrlInChildren(item, pathname);
}

type NavbarStyle3ContentProps = { className?: string; dense?: number };

/**
 * The navbar style 3 content.
 */
function NavbarStyle3Content(props: NavbarStyle3ContentProps) {
	const { className = '', dense = false } = props;
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const { navigation } = useNavigation();
	const [selectedNavigation, setSelectedNavigation] = useState<CreateNavItemType[]>([]);
	const [panelOpen, setPanelOpen] = useState(false);
	const dispatch = useAppDispatch();
	const pathname = usePathname();

	useEffect(() => {
		navigation?.forEach((item) => {
			if (needsToBeOpened(pathname, item)) {
				setSelectedNavigation([item]);
			}
		});
	}, [navigation, pathname]);

	function handleParentItemClick(selected: CreateNavItemType) {
		/** if there is no child item do not set/open panel
		 */
		if (!selected.children) {
			setSelectedNavigation([]);
			setPanelOpen(false);
			return;
		}

		/**
		 * If navigation already selected toggle panel visibility
		 */
		if (selectedNavigation[0]?.id === selected.id) {
			setPanelOpen(!panelOpen);
		} else {
			/**
			 * Set navigation and open panel
			 */
			setSelectedNavigation([selected]);
			setPanelOpen(true);
		}
	}

	function handleChildItemClick() {
		setPanelOpen(false);

		if (isMobile) {
			dispatch(navbarCloseMobile());
		}
	}

	return (
		<ClickAwayListener onClickAway={() => setPanelOpen(false)}>
			<Root className={clsx('flex h-full flex-auto', className)}>
				<div
					id="create-navbar-side-panel"
					className="flex shrink-0 flex-col items-center h-full"
				>
					<img
						className="my-8 w-11"
						src="/assets/images/logo/logo.svg"
						alt="logo"
					/>

					<CreateScrollbars
						className="flex flex-col min-h-0 w-full flex-1 justify-start overflow-y-auto overflow-x-hidden"
						option={{
							suppressScrollX: true,
							wheelPropagation: false
						}}
					>
						<CreateNavigation
							className={clsx('navigation shrink-0 min-h-full')}
							navigation={navigation}
							layout="vertical-2"
							onItemClick={handleParentItemClick}
							firstLevel
							selectedId={selectedNavigation[0]?.id}
							dense={Boolean(dense)}
						/>
					</CreateScrollbars>

					<div className="flex shrink-0 justify-center w-full py-4">
						<UserMenu className="" />
					</div>
				</div>

				{selectedNavigation.length > 0 && (
					<StyledPanel
						id="create-navbar-panel"
						opened={panelOpen}
						className={clsx('overflow-y-auto overflow-x-hidden shadow-sm pt-4')}
						option={{ suppressScrollX: true, wheelPropagation: false }}
					>
						<CreateNavigation
							className={clsx('navigation')}
							navigation={selectedNavigation}
							layout="vertical"
							onItemClick={handleChildItemClick}
						/>
					</StyledPanel>
				)}
			</Root>
		</ClickAwayListener>
	);
}

export default memo(NavbarStyle3Content);
