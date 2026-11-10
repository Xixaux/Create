import { CreateNavItemType } from './types/CreateNavItemType';
import components from './utils/components';

export type CreateNavItemComponentProps = {
	type: string;
	item: CreateNavItemType;
	dense?: boolean;
	nestedLevel?: number;
	onItemClick?: (T: CreateNavItemType) => void;
	checkPermission?: boolean;
};

/**
Component to render NavItem depending on its type.
*/
function CreateNavItem(props: CreateNavItemComponentProps) {
	const { type } = props;

	const C = components[type];

	return C ? <C {...(props as object)} /> : null;
}

export default CreateNavItem;
