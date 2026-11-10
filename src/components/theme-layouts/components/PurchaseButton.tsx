import Button, { ButtonProps } from '@mui/material/Button';
import clsx from 'clsx';
import CreateSvgIcon from '@create/core/CreateSvgIcon';

type PurchaseButtonProps = ButtonProps & {
	className?: string;
};

/**
 * The purchase button.
 */
function PurchaseButton(props: PurchaseButtonProps) {
	const {
		className = '',
		children = (
			<>
				<span>Purchase</span>
				<span className="flex items-center space-x-1">
					<span>Create</span>
				</span>
			</>
		),
		...rest
	} = props;

	return (
		<Button
			component="a"
			href="https://1.envato.market/zDGL6"
			target="_blank"
			rel="noreferrer noopener"
			role="button"
			className={clsx('space-x-1 whitespace-nowrap', className)}
			variant="contained"
			color="secondary"
			startIcon={<CreateSvgIcon size={16}>heroicons-outline:shopping-cart</CreateSvgIcon>}
			{...rest}
		>
			{children}
		</Button>
	);
}

export default PurchaseButton;
