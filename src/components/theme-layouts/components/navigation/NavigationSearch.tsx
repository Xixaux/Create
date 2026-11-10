'use client';

import CreateSearch from '@create/core/CreateSearch';
import useNavigation from './hooks/useNavigation';

type NavigationSearchProps = {
	className?: string;
	variant?: 'basic' | 'full';
};

/**
 * The navigation search.
 */
function NavigationSearch(props: NavigationSearchProps) {
	const { variant, className } = props;
	const { flattenNavigation: navigation } = useNavigation();

	return (
		<CreateSearch
			className={className}
			variant={variant}
			navigation={navigation}
		/>
	);
}

export default NavigationSearch;
