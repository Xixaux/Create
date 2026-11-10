'use client';

import NavLinkAdapter from '@create/core/NavLinkAdapter';
import { styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import { memo, useMemo } from 'react';
import { ListItemButton, ListItemButtonProps } from '@mui/material';
import { WithRouterProps } from '@create/core/withRouter/withRouter';
import CreateNavBadge from '../../CreateNavBadge';
import CreateSvgIcon from '../../../CreateSvgIcon';
import { CreateNavItemComponentProps } from '../../CreateNavItem';

const Root = styled(ListItemButton)<ListItemButtonProps>(({ theme }) => ({
	color: theme.palette.text.primary,
	textDecoration: 'none!important',
	minHeight: 48,
	'&.active': {
		backgroundColor: `${theme.palette.secondary.main}!important`,
		color: `${theme.palette.secondary.contrastText}!important`,
		'& .create-list-item-text-primary': {
			color: 'inherit'
		},
		'& .create-list-item-icon': {
			color: 'inherit'
		}
	},
	'& .create-list-item-icon': {},
	'& .create-list-item-text': {
		padding: '0 0 0 16px'
	}
}));

type CreateNavHorizontalItemProps = CreateNavItemComponentProps & WithRouterProps;

/**
 * CreateNavHorizontalItem is a component responsible for rendering the navigation element in the horizontal menu in the Create theme.
 */
function CreateNavHorizontalItem(props: CreateNavHorizontalItemProps) {
	const { item, checkPermission } = props;
	const component = item.url ? NavLinkAdapter : 'li';

	const itemProps = useMemo(
		() => ({
			...(component !== 'li' && {
				disabled: item.disabled,
				to: item.url || '',
				end: item.end,
				role: 'button',
				exact: item?.exact
			})
		}),
		[item, component]
	);

	const memoizedContent = useMemo(
		() => (
			<Root
				component={component}
				className={clsx('create-list-item', item.active && 'active')}
				sx={item.sx}
				{...itemProps}
			>
				{item.icon && (
					<CreateSvgIcon
						className={clsx('create-list-item-icon shrink-0', item.iconClass)}
						color="action"
					>
						{item.icon}
					</CreateSvgIcon>
				)}

				<ListItemText
					className="create-list-item-text"
					primary={item.title}
					classes={{ primary: 'text-md create-list-item-text-primary truncate' }}
				/>

				{item.badge && (
					<CreateNavBadge
						className="ltr:ml-2 rtl:mr-2"
						badge={item.badge}
					/>
				)}
			</Root>
		),
		[component, item.active, item.badge, item.icon, item.iconClass, item.sx, item.title, itemProps]
	);

	if (checkPermission && !item?.hasPermission) {
		return null;
	}

	return memoizedContent;
}

const NavHorizontalItemWithMemo = memo(CreateNavHorizontalItem);

export default NavHorizontalItemWithMemo;
