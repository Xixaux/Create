import { useContext } from 'react';
import CreateLayoutSettingsContext from './CreateLayoutSettingsContext';

const useCreateLayoutSettings = () => {
	const context = useContext(CreateLayoutSettingsContext);

	if (context === undefined) {
		throw new Error('useCreateLayoutSettings must be used within a SettingsProvider');
	}

	return context;
};

export default useCreateLayoutSettings;
