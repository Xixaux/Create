import { Control } from 'react-hook-form';
import { Typography } from '@mui/material';
import { AnyFormFieldType } from '@create/core/CreateSettings/ThemeFormConfigTypes';
import { CreateSettingsConfigType } from '@create/core/CreateSettings/CreateSettings';
import CreateLayoutConfigs from './CreateLayoutConfigs';
import RadioFormController from './form-controllers/RadioFormController';
import SwitchFormController from './form-controllers/SwitchFormController';
import NumberFormController from './form-controllers/NumberFormController';

type CreateSettingsControllerProps = {
	key?: string;
	name: keyof CreateSettingsConfigType;
	control: Control<CreateSettingsConfigType>;
	title?: string;
	item: AnyFormFieldType;
};

function CreateLayoutConfig(props: CreateSettingsControllerProps) {
	const { item, name, control } = props;

	switch (item.type) {
		case 'radio':
			return (
				<RadioFormController
					name={name}
					control={control}
					item={item}
				/>
			);
		case 'switch':
			return (
				<SwitchFormController
					name={name}
					control={control}
					item={item}
				/>
			);
		case 'number':
			return (
				<NumberFormController
					name={name}
					control={control}
					item={item}
				/>
			);
		case 'group':
			return (
				<div
					key={name}
					className="CreateSettings-formGroup"
				>
					<Typography
						className="CreateSettings-formGroupTitle"
						color="text.secondary"
					>
						{item.title}
					</Typography>
					<CreateLayoutConfigs
						value={item.children}
						prefix={name}
						control={control}
					/>
				</div>
			);
		default:
			return '';
	}
}

export default CreateLayoutConfig;
