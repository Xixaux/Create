'use client';

import _ from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { CreateSettingsConfigType } from '@create/core/CreateSettings/CreateSettings';
import { themeLayoutsType } from 'src/components/theme-layouts/themeLayouts';
import usePathname from '@create/hooks/usePathname';
import useCreateSettings from '@create/core/CreateSettings/hooks/useCreateSettings';
import CreateLayoutSettingsContext from './CreateLayoutSettingsContext';

export type CreateRouteObjectType = {
	settings?: CreateSettingsConfigType;
	auth?: string[] | [] | null | undefined;
};

export type CreateLayoutProps = {
	layouts: themeLayoutsType;
	children?: React.ReactNode;
	settings?: CreateSettingsConfigType['layout'];
};

/**
 * CreateLayout
 * React frontend component in a React project that is used for layouting the user interface. The component
 * handles generating user interface settings related to current routes, merged with default settings, and uses
 * the new settings to generate layouts.
 */
function CreateLayout(props: CreateLayoutProps) {
	const { layouts, children, settings: forcedSettings } = props;

	const { data: current } = useCreateSettings();
	const currentLayoutSetting = useMemo(() => current.layout, [current]);
	const pathname = usePathname();

	const layoutSetting = useMemo(
		() => _.merge({}, currentLayoutSetting, forcedSettings),
		[currentLayoutSetting, forcedSettings]
	);

	const layoutStyle = useMemo(() => layoutSetting.style, [layoutSetting]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<CreateLayoutSettingsContext value={layoutSetting}>
			{useMemo(() => {
				return Object.entries(layouts).map(([key, Layout]) => {
					if (key === layoutStyle) {
						return (
							<React.Fragment key={key}>
								<Layout>{children}</Layout>
							</React.Fragment>
						);
					}

					return null;
				});
			}, [layoutStyle, layouts, children])}
		</CreateLayoutSettingsContext>
	);
}

export default CreateLayout;
