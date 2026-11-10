import { CreateSettingsConfigType } from '@create/core/CreateSettings/CreateSettings';
import { PartialDeep } from 'type-fest';

/**
 * The type definition for a user object.
 */
export type User = {
	id: string;
	role: string[] | string | null;
	displayName: string;
	photoURL?: string;
	email?: string;
	shortcuts?: string[];
	settings?: PartialDeep<CreateSettingsConfigType>;
	loginRedirectUrl?: string; // The URL to redirect to after login.
};
