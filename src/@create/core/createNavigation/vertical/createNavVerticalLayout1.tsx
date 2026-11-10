import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import CreateNavItem from '../CreateNavItem';
import { CreateNavigationProps } from '../CreateNavigation';
import { CreateNavItemType } from '../types/CreateNavItemType';

const StyledList = styled(List)(({ theme }) => ({
    '& .create-list-item': {
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,.04)',
            ...theme.applyStyles('dark', {
                backgroundColor: 'rgba(255, 255, 255, 0.05)'
            })
        },
        '&:focus:not(.active)': {
            backgroundColor: 'rgba(0,0,0,.05)',
            ...theme.applyStyles('dark', {
                backgroundColor: 'rgba(255, 255, 255, 0.06)'
            })
        },
        // Change icon color in light and dark mode
        '& .MuiSvgIcon-root': {
            color: 'rgb(50, 50, 50)', // Dark color for icons in light mode
            ...theme.applyStyles('dark', {
                color: 'rgb(200, 200, 200)' // Light color for icons in dark mode
            })
        }
    },
    '& .create-list-item-text': {
        margin: 0
    },
    '& .create-list-item-text-primary': {
        lineHeight: '20px',
        color: 'inherit',
        ...theme.applyStyles('dark', {
            color: 'rgb(50, 50, 50)'
        })
    },
    '&.active-square-list': {
        '& .create-list-item, & .active.create-list-item': {
            width: '100%',
            borderRadius: '0'
        }
    },
    '&.dense': {
        '& .create-list-item': {
            paddingTop: 0,
            paddingBottom: 0,
            height: 32
        }
    }

    // &:after was here before → now deleted forever
}));

/**
 * CreateNavVerticalLayout1
 * This component is used to render vertical navigations using
 * the Material-UI List component. It accepts the CreateNavigationProps props
 * and renders the CreateNavItem components accordingly
 */
function CreateNavVerticalLayout1(props: CreateNavigationProps) {
    const { navigation, active, dense, className, onItemClick, checkPermission } = props;

    function handleItemClick(item: CreateNavItemType) {
        onItemClick?.(item);
    }

    return (
        <StyledList
            className={clsx(
                'navigation whitespace-nowrap px-3 py-0',
                `active-${active}-list`,
                dense && 'dense',
                className
            )}
        >
            {navigation.map((_item) => (
                <CreateNavItem
                    key={_item.id}
                    type={`vertical-${_item.type}`}
                    item={_item}
                    nestedLevel={0}
                    onItemClick={handleItemClick}
                    checkPermission={checkPermission}
                />
            ))}
        </StyledList>
    );
}

export default CreateNavVerticalLayout1;