import { createSlice, PayloadAction, WithSlice } from '@reduxjs/toolkit';
import { ReactElement } from 'react';
import rootReducer from '@/store/rootReducer';

type InitialStateProps = {
	open: boolean;
	children: ReactElement | string;
};

/**
 * The initial state of the dialog slice.
 */
const initialState: InitialStateProps = {
	open: false,
	children: ''
};

/**
 * The Create Dialog slice
 */
export const createDialogSlice = createSlice({
	name: 'createDialog',
	initialState,
	reducers: {
		openDialog: (state, action: PayloadAction<{ children: InitialStateProps['children'] }>) => {
			state.open = true;
			state.children = action.payload.children;
		},
		closeDialog: () => initialState
	},
	selectors: {
		selectCreateDialogState: (createDialog) => createDialog.open,
		selectCreateDialogProps: (createDialog) => createDialog
	}
});

/**
 * Lazy load
 * */
rootReducer.inject(createDialogSlice);
const injectedSlice = createDialogSlice.injectInto(rootReducer);
declare module '@/store/rootReducer' {
	export interface LazyLoadedSlices extends WithSlice<typeof createDialogSlice> {}
}

export const { closeDialog, openDialog } = createDialogSlice.actions;

export const { selectCreateDialogState, selectCreateDialogProps } = injectedSlice.selectors;

export type dialogSliceType = typeof createDialogSlice;

export default createDialogSlice.reducer;
