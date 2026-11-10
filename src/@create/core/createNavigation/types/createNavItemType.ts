import { SxProps } from '@mui/system';
import { CreateNavBadgeType } from './CreateNavBadgeType';

/**
 * CreateNavItemType
 * A type for Create navigation item and its properties.
 */
export type CreateNavItemType = {
	id: string;
	title?: string;
	translate?: string;
	auth?: string[] | string;
	subtitle?: string;
	icon?: string;
	iconClass?: string;
	url?: string;
	target?: string;
	type?: string;
	sx?: SxProps;
	disabled?: boolean;
	active?: boolean;
	exact?: boolean;
	end?: boolean;
	badge?: CreateNavBadgeType;
	children?: CreateNavItemType[];
	hasPermission?: boolean;
};

export type CreateFlatNavItemType = Omit<CreateNavItemType, 'children' | 'sx'> & { children?: string[]; order: string };
