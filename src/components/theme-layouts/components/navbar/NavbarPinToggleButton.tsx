import clsx from 'clsx';
import NavbarToggleButton, {
	NavbarToggleButtonProps
} from 'src/components/theme-layouts/components/navbar/NavbarToggleButton';
import useCreateLayoutSettings from '@create/core/CreateLayout/useCreateLayoutSettings';

type NavbarPinToggleButtonProps = NavbarToggleButtonProps & {
	className?: string;
	children?: React.ReactNode;
};

/**
 * Navbar pin toggle button.
 */
function NavbarPinToggleButton(props: NavbarPinToggleButtonProps) {
	const { ...rest } = props;
	const { config } = useCreateLayoutSettings();
	const folded = config.navbar?.folded;

	return (
		<NavbarToggleButton
			{...rest}
			className={clsx('rounded-sm', folded ? 'opacity-50' : 'opacity-100', rest.className)}
		/>
	);
}

export default NavbarPinToggleButton;
