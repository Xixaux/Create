import CreateScrollbars from '@create/core/CreateScrollbars';
import { ReactNode } from 'react';

/**
 * Props for the CreatePageSimpleSidebarContent component.
 */
type CreatePageSimpleSidebarContentProps = {
	innerScroll?: boolean;
	children?: ReactNode;
};

/**
 * The CreatePageSimpleSidebarContent component is a content container for the CreatePageSimpleSidebar component.
 */
function CreatePageSimpleSidebarContent(props: CreatePageSimpleSidebarContentProps) {
	const { innerScroll, children } = props;

	if (!children) {
		return null;
	}

	return (
		<CreateScrollbars enable={innerScroll}>
			<div className="CreatePageSimple-sidebarContent flex flex-col min-h-full min-w-80 lg:min-w-0">{children}</div>
		</CreateScrollbars>
	);
}

export default CreatePageSimpleSidebarContent;
