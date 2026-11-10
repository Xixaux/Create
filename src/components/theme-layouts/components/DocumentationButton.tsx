import Button from '@mui/material/Button';
import Link from '@create/core/Link';
import CreateSvgIcon from '@create/core/CreateSvgIcon';

type DocumentationButtonProps = {
	className?: string;
};

/**
 * The documentation button.
 */
function DocumentationButton(props: DocumentationButtonProps) {
	const { className = '' } = props;

	return (
		<Button
			component={Link}
			to="/documentation"
			role="button"
			className={className}
			variant="contained"
			color="primary"
			startIcon={<CreateSvgIcon size={16}>heroicons-outline:book-open</CreateSvgIcon>}
		>
			Documentation
		</Button>
	);
}

export default DocumentationButton;
