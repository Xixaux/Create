import { DeepPartial } from 'react-hook-form';
import { CreateSettingsConfigType } from '@create/core/CreateSettings/CreateSettings';

export const layoutConfigOnlyMain: DeepPartial<CreateSettingsConfigType>['layout'] = {
	config: {
		navbar: {
			display: false
		},
		toolbar: {
			display: false
		},
		footer: {
			display: false
		},
		leftSidePanel: {
			display: false
		},
		rightSidePanel: {
			display: false
		}
	}
};

export const layoutConfigOnlyMainFullWidth: DeepPartial<CreateSettingsConfigType>['layout'] = {
	config: {
		...layoutConfigOnlyMain.config,
		mode: 'fullwidth'
	}
};

export const layoutNoContainer: DeepPartial<CreateSettingsConfigType>['layout'] = {
	config: {
		mode: 'fullwidth'
	}
};
