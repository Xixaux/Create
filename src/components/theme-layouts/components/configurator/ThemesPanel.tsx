import CreateScrollbars from '@create/core/CreateScrollbars';
import IconButton from '@mui/material/IconButton';
import CreateSvgIcon from '@create/core/CreateSvgIcon';
import Typography from '@mui/material/Typography';
import CreateThemeSelector from '@create/core/CreateThemeSelector/CreateThemeSelector';
import { styled, useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { SwipeableHandlers } from 'react-swipeable';
import themeOptions from 'src/configs/themeOptions';
import { CreateThemeOption } from '@create/core/CreateThemeSelector/ThemePreview';
import useUser from '@auth/useUser';
import useCreateSettings from '@create/core/CreateSettings/hooks/useCreateSettings';

import { CreateSettingsConfigType } from '@create/core/CreateSettings/CreateSettings';
import { useAppDispatch } from '@/store/hooks';

const StyledDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialog-paper': {
		position: 'fixed',
		width: 380,
		maxWidth: '90vw',
		backgroundColor: theme.palette.background.paper,
		top: 0,
		height: '100%',
		minHeight: '100%',
		bottom: 0,
		right: 0,
		margin: 0,
		zIndex: 1000,
		borderRadius: 0
	}
}));

type TransitionProps = {
	children?: React.ReactElement;
	ref?: React.RefObject<HTMLDivElement>;
};

function Transition(props: TransitionProps) {
	const { children, ref, ...other } = props;

	const theme = useTheme();

	if (!children) {
		return null;
	}

	return (
		<Slide
			direction={theme.direction === 'ltr' ? 'left' : 'right'}
			ref={ref}
			{...other}
		>
			{children}
		</Slide>
	);
}

type ThemesPanelProps = {
	schemesHandlers: SwipeableHandlers;
	onClose: () => void;
	open: boolean;
};

function ThemesPanel(props: ThemesPanelProps) {
	const { schemesHandlers, onClose, open } = props;
	const { setSettings } = useCreateSettings();
	const { isGuest, updateUserSettings } = useUser();
	const dispatch = useAppDispatch();

	async function handleThemeSelect(_theme: CreateThemeOption) {
		const _newSettings = setSettings({ theme: { ..._theme?.section } } as Partial<CreateSettingsConfigType>);

		/**
		 * Updating user settings disabled for demonstration purposes
		 * The request is made to the mock API and will not persist the changes
		 * You can enable it by removing the comment block below when using a real API
		 * */
		/* if (!isGuest) {
			const updatedUserData = await updateUserSettings(_newSettings);

			if (updatedUserData) {
				dispatch(showMessage({ message: 'User settings saved.' }));
			}
		} */
	}

	return (
		<StyledDialog
			TransitionComponent={Transition}
			aria-labelledby="schemes-panel"
			aria-describedby="schemes"
			open={open}
			onClose={onClose}
			BackdropProps={{ invisible: true }}
			classes={{
				paper: 'shadow-lg'
			}}
			{...schemesHandlers}
		>
			<CreateScrollbars className="p-4 sm:p-6">
				<IconButton
					className="fixed top-0 z-10 ltr:right-0 rtl:left-0"
					onClick={onClose}
					size="large"
				>
					<CreateSvgIcon>heroicons-outline:x-mark</CreateSvgIcon>
				</IconButton>

				<Typography
					className="mb-8"
					variant="h6"
				>
					Headline here
				</Typography>

				<Typography
					className="mb-6 text-justify text-md italic"
					color="text.secondary"
				>
					Content here
				</Typography>

				<CreateThemeSelector
					options={themeOptions}
					onSelect={handleThemeSelect}
				/>
			</CreateScrollbars>
		</StyledDialog>
	);
}

export default ThemesPanel;
