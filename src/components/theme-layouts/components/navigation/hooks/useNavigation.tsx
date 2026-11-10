'use client';

import { useAppSelector } from 'src/store/hooks';
import { useMemo } from 'react';
import i18n from '@i18n';
import useUser from '@auth/useUser';
import useI18n from '@i18n/useI18n';
import CreateUtils from '@create/utils';
import CreateNavigationHelper from '@create/utils/CreateNavigationHelper';
import { CreateNavItemType } from '@create/core/CreateNavigation/types/CreateNavItemType';
import { selectNavigationAll } from '../store/navigationSlice';

function useNavigation() {
	const { data: user } = useUser();
	const userRole = user?.role;
	const { languageId } = useI18n();

	const navigationData = useAppSelector(selectNavigationAll);

	const navigation = useMemo(() => {
		const _navigation = CreateNavigationHelper.unflattenNavigation(navigationData);

		function setAdditionalData(data: CreateNavItemType[]): CreateNavItemType[] {
			return data?.map((item) => ({
				hasPermission: Boolean(CreateUtils.hasPermission(item?.auth, userRole)),
				...item,
				...(item?.translate && item?.title ? { title: i18n.t(`navigation:${item?.translate}`) } : {}),
				...(item?.children ? { children: setAdditionalData(item?.children) } : {})
			}));
		}

		const translatedValues = setAdditionalData(_navigation);

		return translatedValues;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigationData, userRole, languageId]);

	const flattenNavigation = useMemo(() => {
		return CreateNavigationHelper.flattenNavigation(navigation);
	}, [navigation]);

	return { navigation, flattenNavigation };
}

export default useNavigation;
