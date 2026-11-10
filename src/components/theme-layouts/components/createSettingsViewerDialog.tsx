import { useState } from 'react';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import CreateSvgIcon from '@create/core/CreateSvgIcon';
import Dialog from '@mui/material/Dialog';
import CreateHighlight from '@create/core/CreateHighlight';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import qs from 'qs';
import Typography from '@mui/material/Typography';
import useCreateSettings from '@create/core/CreateSettings/hooks/useCreateSettings';

type CreateSettingsViewerDialogProps = {
	className?: string;
};

/**
 * The settings viewer dialog.
 */
function CreateSettingsViewerDialog(props: CreateSettingsViewerDialogProps) {
	const { className = '' } = props;

	const [openDialog, setOpenDialog] = useState(false);
	const { data: settings } = useCreateSettings();

	const jsonStringifiedSettings = JSON.stringify(settings);
	const queryString = qs.stringify({
		defaultSettings: jsonStringifiedSettings,
		strictNullHandling: true
	});

	function handleOpenDialog() {
		setOpenDialog(true);
	}

	function handleCloseDialog() {
		setOpenDialog(false);
	}

	return (
		<div className={clsx('', className)}>
			<Button
				variant="contained"
				color="secondary"
				className="w-full"
				onClick={handleOpenDialog}
				startIcon={<CreateSvgIcon>heroicons-outline:code-bracket</CreateSvgIcon>}
			>
				View settings as json/query params
			</Button>

			<Dialog
				open={openDialog}
				onClose={handleCloseDialog}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle>Create Settings Viewer</DialogTitle>
				<DialogContent>
					<Typography className="mb-4 mt-6 text-lg font-bold">JSON</Typography>

					<CreateHighlight
						component="pre"
						className="language-json"
					>
						{JSON.stringify(settings, null, 2)}
					</CreateHighlight>

					<Typography className="mb-4 mt-6 text-lg font-bold">Query Params</Typography>

					{queryString}
				</DialogContent>
				<DialogActions>
					<Button
						color="secondary"
						variant="contained"
						onClick={handleCloseDialog}
					>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default CreateSettingsViewerDialog;
