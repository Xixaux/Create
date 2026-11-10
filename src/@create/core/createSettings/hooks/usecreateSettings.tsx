import { useContext } from 'react';
import CreateSettingsContext, { CreateSettingsContextType } from '../CreateSettingsContext';

const useCreateSettings = (): CreateSettingsContextType => {
	const context = useContext(CreateSettingsContext);

	if (!context) {
		throw new Error('useSettings must be used within a CreateSettingsProvider');
	}

	return context;
};

export default useCreateSettings;
