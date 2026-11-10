import CreateSvgIcon from '@create/core/CreateSvgIcon';

type NotificationIconProps = {
	value?: string;
};

/**
 * The notification icon.
 */
function NotificationIcon(props: NotificationIconProps) {
	const { value } = props;

	switch (value) {
		case 'error': {
			return (
				<CreateSvgIcon
					className="mr-2 opacity-75"
					color="inherit"
					size={20}
				>
					heroicons-outline:minus-circle
				</CreateSvgIcon>
			);
		}
		case 'success': {
			return (
				<CreateSvgIcon
					className="mr-2 opacity-75"
					color="inherit"
					size={20}
				>
					heroicons-outline:check-circle
				</CreateSvgIcon>
			);
		}
		case 'warning': {
			return (
				<CreateSvgIcon
					className="mr-2 opacity-75"
					color="inherit"
					size={20}
				>
					heroicons-outline:exclamation-circle
				</CreateSvgIcon>
			);
		}
		case 'info': {
			return (
				<CreateSvgIcon
					className="mr-2 opacity-75"
					color="inherit"
					size={20}
				>
					heroicons-outline:information-circle
				</CreateSvgIcon>
			);
		}
		default: {
			return null;
		}
	}
}

export default NotificationIcon;
