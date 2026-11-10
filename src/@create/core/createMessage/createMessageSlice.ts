import { createSlice, PayloadAction, WithSlice } from '@reduxjs/toolkit';
import { ReactElement } from 'react';
import rootReducer from '@/store/rootReducer';

/**
 * The type definition for the initial state of the message slice.
 */
type initialStateProps = {
	state: boolean;
	options: {
		variant: 'success' | 'error' | 'warning' | 'info';
		anchorOrigin: {
			vertical: 'top' | 'bottom';
			horizontal: 'left' | 'center' | 'right';
		};
		autoHideDuration: number | null;
		message: ReactElement | string;
	};
};

/**
 * The initial state of the message slice.
 */
const initialState: initialStateProps = {
	state: false,
	options: {
		variant: 'info',
		anchorOrigin: {
			vertical: 'top',
			horizontal: 'center'
		},
		autoHideDuration: 2000,
		message: 'Hi'
	}
};

/**
 * The Message slice.
 */
export const createMessageSlice = createSlice({
	name: 'createMessage',
	initialState,
	reducers: {
		showMessage(state, action: PayloadAction<Partial<initialStateProps['options']>>) {
			state.state = true;
			state.options = {
				...initialState.options,
				...action.payload
			};
		},
		hideMessage(state) {
			state.state = false;
		}
	},
	selectors: {
		selectCreateMessageState: (createMessage) => createMessage.state,
		selectCreateMessageOptions: (createMessage) => createMessage.options
	}
});

/**
 * Lazy load
 * */
rootReducer.inject(createMessageSlice);
const injectedSlice = createMessageSlice.injectInto(rootReducer);
declare module '@/store/rootReducer' {
	export interface LazyLoadedSlices extends WithSlice<typeof createMessageSlice> {}
}

export const { hideMessage, showMessage } = createMessageSlice.actions;

export const { selectCreateMessageOptions, selectCreateMessageState } = injectedSlice.selectors;

export type messageSliceType = typeof createMessageSlice;

export default createMessageSlice.reducer;
