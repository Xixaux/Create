'use client';
import NavLinkAdapter from '@create/core/NavLinkAdapter';
import { alpha, styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import List, { ListProps } from '@mui/material/List';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { ListItemButton } from '@mui/material';
import usePathname from '@create/hooks/usePathname';
import CreateNavBadge from '../../CreateNavBadge';
import CreateNavItem, { CreateNavItemComponentProps } from '../../CreateNavItem';
import CreateSvgIcon from '../../../CreateSvgIcon';
import { CreateNavItemType } from '../../types/CreateNavItemType';
import isUrlInChildren from '../../isUrlInChildren'; // Added missing import

type ListComponentProps = ListProps & {
    itempadding: number;
};

const Root = styled(List)<ListComponentProps>(({ theme, ...props }) => ({
    padding: 0,
    '&.open': {},
    '& > .create-list-item': {
        minHeight: 36,
        width: '100%',
        borderRadius: '8px',
        margin: '0 0 4px 0',
        paddingRight: 16,
        paddingLeft: props.itempadding > 80 ? 80 : props.itempadding,
        paddingTop: 10,
        paddingBottom: 10,
        color: alpha(theme.palette.text.primary, 0.7),
        '&:hover': {
            color: theme.palette.text.primary
        },
        '& > .create-list-item-icon': {
            marginRight: 16,
            color: '#000000 !important' // Force black for main icon
        },
        // Target the arrow icon's container
        '& .arrow-icon-container': {
            color: '#000000 !important', // Force black for arrow icon container
            '& .arrow-icon': {
                color: '#000000 !important', // Force black for arrow icon
                fill: '#000000 !important', // Ensure SVG fill is black
                stroke: '#000000 !important' // Ensure SVG stroke is black
            }
        }
    }
}));

function needsToBeOpened(pathname: string, item: CreateNavItemType) {
    return pathname && isUrlInChildren(item, pathname);
}

/**
 * CreateNavVerticalCollapse component used for vertical navigation items with collapsible children.
 */
function CreateNavVerticalCollapse(props: CreateNavItemComponentProps) {
    const pathname = usePathname();
    const { item, nestedLevel = 0, onItemClick, checkPermission } = props;
    const [open, setOpen] = useState(() => needsToBeOpened(pathname, item));
    const itempadding = nestedLevel > 0 ? 38 + nestedLevel * 16 : 16;
    const component = item.url ? NavLinkAdapter : 'li';

    const itemProps = useMemo(
        () => ({
            ...(component !== 'li' && {
                disabled: item.disabled,
                to: item.url,
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
                className={clsx(open && 'open')}
                itempadding={itempadding}
                sx={item.sx}
            >
                <ListItemButton
                    component={component}
                    className="create-list-item"
                    onClick={() => {
                        setOpen(!open);
                    }}
                    {...itemProps}
                >
                    {item.icon && (
                        <CreateSvgIcon
                            className={clsx('create-list-item-icon shrink-0 force-dark-icon', item.iconClass)}
                            sx={{ color: '#000000 !important', fill: '#000000 !important', stroke: '#000000 !important' }} // Force black for main icon
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

                    {item.badge && (
                        <CreateNavBadge
                            className="mx-1"
                            badge={item.badge}
                        />
                    )}

                    <IconButton
                        disableRipple
                        className={clsx("-mx-3 h-5 w-5 p-0 hover:bg-transparent focus:bg-transparent", "arrow-icon-container")}
                        onClick={(ev) => {
                            ev.preventDefault();
                            ev.stopPropagation();
                            setOpen(!open);
                        }}
                    >
                        <CreateSvgIcon
                            size={13}
                            className={clsx("arrow-icon force-dark-icon")}
                            sx={{ color: '#000000 !important', fill: '#000000 !important', stroke: '#000000 !important' }} // Force black for arrow icon
                        >
                            {open ? 'heroicons-solid:chevron-down' : 'heroicons-solid:chevron-right'}
                        </CreateSvgIcon>
                    </IconButton>
                </ListItemButton>

                {item.children && (
                    <Collapse
                        in={open}
                        className="collapse-children"
                    >
                        {item.children.map((_item) => (
                            <CreateNavItem
                                key={_item.id}
                                type={`vertical-${_item.type}`}
                                item={_item}
                                nestedLevel={nestedLevel + 1}
                                onItemClick={onItemClick}
                                checkPermission={checkPermission}
                            />
                        ))}
                    </Collapse>
                )}
            </Root>
        ),
        [
            checkPermission,
            component,
            item.badge,
            item.children,
            item.icon,
            item.iconClass,
            item.subtitle,
            item.sx,
            item.title,
            itemProps,
            itempadding,
            nestedLevel,
            onItemClick,
            open
        ]
    );

    if (checkPermission && !item?.hasPermission) {
        return null;
    }

    return memoizedContent;
}

const NavVerticalCollapse = CreateNavVerticalCollapse;

export default NavVerticalCollapse;