import CreateScrollbars from '@create/core/CreateScrollbars';
import { ReactNode } from 'react';

/**
 * Props for the CreatePageCardedSidebarContent component.
 */
type CreatePageCardedSidebarContentProps = {
	innerScroll?: boolean;
	children?: ReactNode;
};

/**
 * The CreatePageCardedSidebarContent component is a content container for the CreatePageCardedSidebar component.
 */
function CreatePageCardedSidebarContent(props: CreatePageCardedSidebarContentProps) {
	const { innerScroll, children } = props;

	if (!children) {
		return null;
	}

	return (
		<CreateScrollbars enable={innerScroll}>
			<div className="CreatePageCarded-sidebarContent min-w-80 lg:min-w-0">{children}</div>
		</CreateScrollbars>
	);
}

export default CreatePageCardedSidebarContent;
