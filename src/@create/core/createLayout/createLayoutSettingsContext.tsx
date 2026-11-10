import { createContext } from 'react';
import { CreateSettingsConfigType } from '@create/core/CreateSettings/CreateSettings';

type CreateLayoutSettingsContextType = CreateSettingsConfigType['layout'];

const CreateLayoutSettingsContext = createContext<CreateLayoutSettingsContextType | undefined>(undefined);

export default CreateLayoutSettingsContext;
