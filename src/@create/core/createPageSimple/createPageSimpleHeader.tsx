import clsx from 'clsx';
import { ReactNode } from 'react';

/**
 * Props for the CreatePageSimpleHeader component.
 */
type CreatePageSimpleHeaderProps = {
	className?: string;
	header?: ReactNode;
};

/**
 * The CreatePageSimpleHeader component is a sub-component of the CreatePageSimple layout component.
 * It provides a header area for the layout.
 */
function CreatePageSimpleHeader(props: CreatePageSimpleHeaderProps) {
	const { header = null, className } = props;
	return (
		<div className={clsx('CreatePageSimple-header', className)}>
			<div className="container">{header}</div>
		</div>
	);
}

export default CreatePageSimpleHeader;
