'use client';

import NavLinkAdapter from '@create/core/NavLinkAdapter';
import { alpha, styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import { useMemo } from 'react';
import { ListItemButton, ListItemButtonProps } from '@mui/material';
import CreateNavBadge from '../../CreateNavBadge';
import CreateSvgIcon from '../../../CreateSvgIcon';
import { CreateNavItemComponentProps } from '../../CreateNavItem';

type ListItemButtonStyleProps = ListItemButtonProps & {
  itempadding: number;
};

const Root = styled(ListItemButton)<ListItemButtonStyleProps>(({ theme, ...props }) => ({
  minHeight: 36,
  width: '100%',
  borderRadius: '8px',
  margin: '0 0 4px 0', // ← This was causing the consistent 4px gap between ALL items
  paddingRight: 16,
  paddingLeft: props.itempadding > 80 ? 80 : props.itempadding,
  paddingTop: 10,
  paddingBottom: 10,
  color: alpha(theme.palette.text.primary, 0.7),
  cursor: 'pointer',
  textDecoration: 'none!important',
  '&:hover': {
    color: theme.palette.text.primary
  },
  '&.active': {
    color: theme.palette.text.primary,
    backgroundColor:
      theme.palette.mode === 'light' ? 'rgba(0, 0, 0, .05)!important' : 'rgba(255, 255, 255, .1)!important',
    transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
    '& > .create-list-item-text-primary': {
      color: 'inherit'
    },
    '& > .create-list-item-icon': {
      color: '#000000 !important'
    }
  },
  '& > .create-list-item-icon': {
    marginRight: 16,
    color: '#000000 !important'
  },
  '& > .create-list-item-text': {}
}));

/**
 * CreateNavVerticalItem is a React component used to render CreateNavItem as part of the Create navigational component.
 */
function CreateNavVerticalItem(props: CreateNavItemComponentProps) {
  const { item, nestedLevel = 0, onItemClick, checkPermission } = props;
  const itempadding = nestedLevel > 0 ? 38 + nestedLevel * 16 : 16;
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
        onClick={() => onItemClick && onItemClick(item)}
        itempadding={itempadding}
        sx={{
          ...item.sx,
          marginBottom: 0, // ← Override the 4px bottom margin completely
        }}
        {...itemProps}
      >
        {item.icon && (
          <CreateSvgIcon
            className={clsx('create-list-item-icon shrink-0 force-dark-icon', item.iconClass)}
            sx={{ color: '#000000 !important', fill: '#000000 !important', stroke: '#000000 !important' }}
          >
            {item.icon}
          </CreateSvgIcon>
        )}

        <ListItemText
          className="create-list-item-text"
          primary={item.title}
          secondary={item.subtitle}
          classes={{
            primary: 'text-md font-medium create-list-item-text-primary truncate',
            secondary: 'text-sm font-medium create-list-item-text-secondary leading-[1.5] truncate'
          }}
        />
        {item.badge && <CreateNavBadge badge={item.badge} />}
      </Root>
    ),
    [component, item, itemProps, itempadding, onItemClick]
  );

  if (checkPermission && !item?.hasPermission) {
    return null;
  }

  return memoizedContent;
}

const NavVerticalItem = CreateNavVerticalItem;

export default NavVerticalItem;