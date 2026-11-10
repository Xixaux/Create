import { CreateNavItemType } from '@create/core/CreateNavigation/types/CreateNavItemType';

const SettingsAppNavigation: CreateNavItemType = {
	id: 'apps.settings',
	title: 'Settings',
	type: 'collapse',
	icon: 'heroicons-outline:cog-6-tooth',
	url: '/apps/settings',
	children: [
		{
			"id": "apps.settings.account",
			"icon": "heroicons-outline:user-circle",
			"title": "Account Overview",
			"type": "item",
			"url": "/apps/settings/account",
			"subtitle": "View and update your account details and personal information"
		},
				{
			"id": "apps.settings.team",
			"icon": "heroicons-outline:shield-check",
			"title": "Privacy Options",
			"type": "item",
			"url": "/apps/settings/privacy",
			"subtitle": "Manage your visibility and application privacy"
		},
		{
			"id": "apps.settings.planBilling",
			"icon": "heroicons-outline:credit-card",
			"title": "Services and Subscriptions",
			"type": "item",
			"url": "/apps/settings/plan-billing",
			"subtitle": "Control your data sharing and privacy preferences"
		}
	]
};

export default SettingsAppNavigation;
