import clsx from 'clsx';
import { ReactNode } from 'react';

/**
 * Props for the CreatePageCardedHeader component.
 */
type CreatePageCardedHeaderProps = {
	header?: ReactNode;
};

/**
 * The CreatePageCardedHeader component is a header for the CreatePageCarded component.
 */
function CreatePageCardedHeader(props: CreatePageCardedHeaderProps) {
	const { header = null } = props;

	return <div className={clsx('CreatePageCarded-header', 'container')}>{header}</div>;
}

export default CreatePageCardedHeader;
