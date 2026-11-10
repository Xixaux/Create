import Divider from '@mui/material/Divider';
import { memo } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import CreateNavHorizontalLayout1 from './horizontal/CreateNavHorizontalLayout1';
import CreateNavVerticalLayout1 from './vertical/CreateNavVerticalLayout1';
import CreateNavVerticalLayout2 from './vertical/CreateNavVerticalLayout2'; // Fixed: added ./
import CreateNavHorizontalCollapse from './horizontal/types/CreateNavHorizontalCollapse';
import CreateNavHorizontalGroup from './horizontal/types/CreateNavHorizontalGroup';
import CreateNavHorizontalItem from './horizontal/types/CreateNavHorizontalItem';
import CreateNavHorizontalLink from './horizontal/types/CreateNavHorizontalLink';
import CreateNavVerticalCollapse from './vertical/types/CreateNavVerticalCollapse';
import CreateNavVerticalGroup from './vertical/types/CreateNavVerticalGroup';
import CreateNavVerticalItem from './vertical/types/CreateNavVerticalItem';
import CreateNavVerticalLink from './vertical/types/CreateNavVerticalLink';
import { CreateNavItemType } from './types/CreateNavItemType';
import { registerComponent } from './utils/registerComponent';

const inputGlobalStyles = (
    <GlobalStyles
        styles={() => ({
            '.popper-navigation-list': {
                '& .create-list-item': {
                    padding: '8px 12px 8px 12px',
                    height: 36,
                    minHeight: 36,
                    '& .create-list-item-text': {
                        padding: '0 0 0 8px'
                    }
                },
                '&.dense': {
                    '& .create-list-item': {
                        minHeight: 32,
                        height: 32,
                        '& .create-list-item-text': {
                            padding: '0 0 0 8px'
                        }
                    }
                }
            }
        })}
    />
);

/*
Register Create Navigation Components
 */
registerComponent('vertical-group', CreateNavVerticalGroup);
registerComponent('vertical-collapse', CreateNavVerticalCollapse);
registerComponent('vertical-item', CreateNavVerticalItem);
registerComponent('vertical-link', CreateNavVerticalLink);
registerComponent('horizontal-group', CreateNavHorizontalGroup);
registerComponent('horizontal-collapse', CreateNavHorizontalCollapse);
registerComponent('horizontal-item', CreateNavHorizontalItem);
registerComponent('horizontal-link', CreateNavHorizontalLink);

// Keep normal horizontal dividers
registerComponent('divider', () => <Divider className="my-4" />);
registerComponent('horizontal-divider', () => <Divider className="my-4" />);

// PERMANENTLY KILL THE VERTICAL DIVIDER (the 1px dark line in the left sidebar)
registerComponent('vertical-divider', () => null);

export type CreateNavigationProps = {
    className?: string;
    dense?: boolean;
    active?: boolean;
    onItemClick?: (T: CreateNavItemType) => void;
    navigation?: CreateNavItemType[];
    layout?: 'horizontal' | 'vertical' | 'vertical-2';
    firstLevel?: boolean;
    selectedId?: string;
    checkPermission?: boolean;
};

/**
 * CreateNavigation
 * Component for displaying a navigation bar which contains CreateNavItem components
 * and acts as parent for providing props to its children components
 */
function CreateNavigation(props: CreateNavigationProps) {
    const { navigation, layout = 'vertical' } = props;

    if (!navigation || navigation.length === 0) {
        return null;
    }

    return (
        <>
            {inputGlobalStyles}
            {layout === 'horizontal' && (
                <CreateNavHorizontalLayout1
                    checkPermission={false}
                    {...props}
                />
            )}
            {layout === 'vertical' && (
                <CreateNavVerticalLayout1
                    checkPermission={false}
                    {...props}
                />
            )}
            {layout === 'vertical-2' && (
                <CreateNavVerticalLayout2
                    checkPermission={false}
                    {...props}
                />
            )}
        </>
    );
}

export default memo(CreateNavigation);