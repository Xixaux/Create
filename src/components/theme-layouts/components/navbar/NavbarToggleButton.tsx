import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from 'src/store/hooks';
import _ from 'lodash';
import useThemeMediaQuery from '@create/hooks/useThemeMediaQuery';
import CreateSvgIcon from '@create/core/CreateSvgIcon';
import clsx from 'clsx';
import { IconButtonProps } from '@mui/material/IconButton/IconButton';
import useCreateLayoutSettings from '@create/core/CreateLayout/useCreateLayoutSettings';
import useCreateSettings from '@create/core/CreateSettings/hooks/useCreateSettings';
import { navbarToggle, navbarToggleMobile } from './navbarSlice';

export type NavbarToggleButtonProps = IconButtonProps;

/**
 * The navbar toggle button.
 */
function NavbarToggleButton(props: NavbarToggleButtonProps) {
	const {
		className = '',
		children = (
			<CreateSvgIcon
				size={22}
				color="action"
			>
				heroicons-outline:bars-3
			</CreateSvgIcon>
		),
		...rest
	} = props;

	const dispatch = useAppDispatch();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const { config } = useCreateLayoutSettings();
	const { setSettings } = useCreateSettings();

	return (
		<IconButton
			onClick={() => {
				if (isMobile) {
					dispatch(navbarToggleMobile());
				} else if (config?.navbar?.style === 'style-2') {
					setSettings(_.set({}, 'layout.config.navbar.folded', !config?.navbar?.folded));
				} else {
					dispatch(navbarToggle());
				}
			}}
			{...rest}
			className={clsx('border border-divider', className)}
		>
			{children}
		</IconButton>
	);
}

export default NavbarToggleButton;
