import { styled } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';
import themeLayoutConfigs, { themeLayoutDefaultsProps } from 'src/components/theme-layouts/themeLayoutConfigs';
import _ from 'lodash';
import { FormControl, Typography } from '@mui/material';
import { memo, useEffect, useMemo } from 'react';
import { Palette } from '@mui/material/styles/createPalette';
import { PartialDeep } from 'type-fest';
import CreateLayoutConfigs from '@create/core/CreateSettings/CreateLayoutConfigs';
import usePrevious from '@create/hooks/usePrevious';
import PaletteSelector from './palette-generator/PaletteSelector';
import SectionPreview from './palette-generator/SectionPreview';

export type CreateThemeType = { palette: PartialDeep<Palette> };
export type CreateThemesType = Record<string, CreateThemeType>;
export type CreateSettingsConfigType = {
	layout: { style?: string; config?: PartialDeep<themeLayoutDefaultsProps> };
	theme: { main: CreateThemeType; navbar: CreateThemeType; toolbar: CreateThemeType; footer: CreateThemeType };
	defaultAuth?: string[];
	loginRedirectUrl: string;
};

type CreateSettingsProps = {
	value: CreateSettingsConfigType;
	onChange: (settings: CreateSettingsConfigType) => void;
};

// You need to keep at least a function or variable that uses these types,
// or the exports need to be explicit to avoid "module not found" errors
// if other files rely on this file providing a default export or named export.
// Since the original file had a default export, a placeholder is needed.

/**
 * The Root styled component is kept as it's a styled definition, not a functional component logic.
 */
const Root = styled('div')(({ theme }) => ({
	'& .CreateSettings-formControl': {
		margin: '6px 0',
		width: '100%',
		'&:last-child': { marginBottom: 0 }
	},
	'& .CreateSettings-formGroupTitle': {
		position: 'absolute',
		top: -10,
		left: 8,
		fontWeight: 500,
		padding: '0 4px',
		backgroundColor: theme.palette.background.paper
	},
	'& .CreateSettings-formGroup': {
		position: 'relative',
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: 2,
		padding: '12px 12px 0 12px',
		margin: '24px 0 16px 0',
		'&:first-of-type': { marginTop: 16 }
	}
}));

// Placeholder for the default exported component to prevent crashes in other files
// that expect a default export from this module.
// It is intentionally empty to satisfy the "remove all the functions" request.
function CreateSettings(props: CreateSettingsProps) {
	return <Root />;
}

export default memo(CreateSettings);