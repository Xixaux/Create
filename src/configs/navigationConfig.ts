/* eslint-disable prettier/prettier */
import i18n from '@i18n';
import { CreateNavItemType } from '@create/core/CreateNavigation/types/CreateNavItemType';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import SettingsAppNavigation from '../app/(control-panel)/apps/settings/SettingsAppNavigation';

i18n.addResourceBundle('en', 'navigation', en);
i18n.addResourceBundle('tr', 'navigation', tr);
i18n.addResourceBundle('ar', 'navigation', ar);

const navigationConfig: CreateNavItemType[] = [
  {
    id: 'apps.environment-developer',
    title: 'Build Things',
    type: 'item',
    icon: 'heroicons-outline:cube',
    url: '/apps/environment-developer',
  },
  {
    id: 'dashboards.ecommerce',
    title: 'Object Stats',
    type: 'collapse',
    icon: 'heroicons-outline:chart-bar',
    children: [
      {
        id: 'ecommerce.e-commerce-products',
        title: 'Intelligence Analytics',
        type: 'item',
        icon: 'heroicons-outline:presentation-chart-line',
        url: '/dashboards/analytics',
      },
    ],
  },
  {
    ...SettingsAppNavigation,
    type: 'item',
    badge: {
      title: '2',
    },
  },
];

export default navigationConfig;