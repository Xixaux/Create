import Dialog from '@mui/material/Dialog';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { closeDialog, selectCreateDialogProps } from '@create/core/CreateDialog/createDialogSlice';

/**
 * CreateDialog component
 * This component renders a material UI ```Dialog``` component
 * with properties pulled from the redux store
 */
function CreateDialog() {
	const dispatch = useAppDispatch();
	const options = useAppSelector(selectCreateDialogProps);

	return (
		<Dialog
			onClose={() => dispatch(closeDialog())}
			aria-labelledby="create-dialog-title"
			classes={{
				paper: 'rounded-lg'
			}}
			{...options}
		/>
	);
}

export default CreateDialog;
