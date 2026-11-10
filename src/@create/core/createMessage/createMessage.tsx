import { amber, blue, green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { hideMessage, selectCreateMessageOptions, selectCreateMessageState } from '@create/core/CreateMessage/createMessageSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import CreateSvgIcon from '../CreateSvgIcon';

export type CreateMessageVariantType = 'success' | 'error' | 'warning' | 'info';

type StyledSnackbarProps = {
	variant?: CreateMessageVariantType;
};

const StyledSnackbar = styled(Snackbar)<StyledSnackbarProps>(({ theme }) => ({
	'& .CreateMessage-content': {},
	variants: [
		{
			props: {
				variant: 'success'
			},
			style: {
				'& .CreateMessage-content': {
					backgroundColor: green[600],
					color: '#FFFFFF'
				}
			}
		},
		{
			props: {
				variant: 'error'
			},
			style: {
				'& .CreateMessage-content': {
					backgroundColor: theme.palette.error.dark,
					color: theme.palette.getContrastText(theme.palette.error.dark)
				}
			}
		},
		{
			props: {
				variant: 'info'
			},
			style: {
				'& .CreateMessage-content': {
					backgroundColor: blue[600],
					color: '#FFFFFF'
				}
			}
		},
		{
			props: {
				variant: 'warning'
			},
			style: {
				'& .CreateMessage-content': {
					backgroundColor: amber[600],
					color: '#FFFFFF'
				}
			}
		}
	]
}));

const variantIcon = {
	success: 'check_circle',
	warning: 'warning',
	error: 'error_outline',
	info: 'info'
};

/**
 * CreateMessage
 * The CreateMessage component holds a snackbar that is capable of displaying message with 4 different variant. It uses the @mui/material React packages to create the components.
 */
function CreateMessage() {
	const dispatch = useAppDispatch();
	const state = useAppSelector(selectCreateMessageState);
	const options = useAppSelector(selectCreateMessageOptions);

	return (
		<StyledSnackbar
			{...options}
			open={state}
			onClose={() => dispatch(hideMessage())}
		>
			<SnackbarContent
				className="CreateMessage-content"
				message={
					<div className="flex items-center">
						{variantIcon[options.variant] && (
							<CreateSvgIcon color="inherit">{variantIcon[options.variant]}</CreateSvgIcon>
						)}
						<Typography className="mx-2">{options.message}</Typography>
					</div>
				}
				action={[
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						onClick={() => dispatch(hideMessage())}
						size="large"
					>
						<CreateSvgIcon>heroicons-outline:x-mark</CreateSvgIcon>
					</IconButton>
				]}
			/>
		</StyledSnackbar>
	);
}

export default memo(CreateMessage);
