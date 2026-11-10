import { CreateSettingsConfigType, CreateThemesType } from '@create/core/CreateSettings/CreateSettings';
import { createContext } from 'react';

// CreateSettingsContext type
export type CreateSettingsContextType = {
	data: CreateSettingsConfigType;
	setSettings: (newSettings: Partial<CreateSettingsConfigType>) => CreateSettingsConfigType;
	changeTheme: (newTheme: CreateThemesType) => void;
};

// Context with a default value of undefined
const CreateSettingsContext = createContext<CreateSettingsContextType | undefined>(undefined);

export default CreateSettingsContext;
