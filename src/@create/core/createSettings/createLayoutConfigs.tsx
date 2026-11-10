import { Control } from 'react-hook-form';
import CreateLayoutConfig from './CreateLayoutConfig';
import ThemeFormConfigTypes from './ThemeFormConfigTypes';
import { CreateSettingsConfigType } from './CreateSettings';

type CreateSettingsControllersProps = {
	value: ThemeFormConfigTypes;
	prefix: string;
	control: Control<CreateSettingsConfigType>;
};

function CreateLayoutConfigs(props: CreateSettingsControllersProps) {
	const { value, prefix, control } = props;

	return Object?.entries?.(value)?.map?.(([key, item]) => {
		const name = prefix ? `${prefix}.${key}` : key;
		return (
			<CreateLayoutConfig
				key={key}
				name={name as keyof CreateSettingsConfigType}
				control={control}
				item={item}
			/>
		);
	});
}

export default CreateLayoutConfigs;
