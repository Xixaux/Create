import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { memo } from 'react';
import { CreateNavBadgeType } from './types/CreateNavBadgeType';

const Root = styled('div')(({ theme }) => ({
	padding: '0 7px',
	fontSize: 11,
	fontWeight: 500,
	height: 20,
	minWidth: 20,
	borderRadius: 20,
	display: 'flex',
	alignItems: 'center',
	backgroundColor: theme.palette.secondary.main,
	color: theme.palette.secondary.contrastText
}));

type CreateNavBadgeProps = {
	className?: string;
	classes?: string;
	badge: CreateNavBadgeType;
};

/**
 * CreateNavBadge component.
 * This component will render a badge on a CreateNav element. It accepts a `CreateNavBadgeType` as a prop,
 * which is an object containing a title and background and foreground colour.
 */
function CreateNavBadge(props: CreateNavBadgeProps) {
	const { className = '', classes = '', badge } = props;

	return (
		<Root
			className={clsx('item-badge', className, classes)}
			style={{
				backgroundColor: badge.bg,
				color: badge.fg
			}}
		>
			{badge.title}
		</Root>
	);
}

export default memo(CreateNavBadge);
