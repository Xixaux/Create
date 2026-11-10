import { createSlice } from '@reduxjs/toolkit';
import type { WithSlice } from '@reduxjs/toolkit';
import rootReducer from '@/store/rootReducer';

const exampleData = {
    // notes have been removed – events array is now empty (or you can delete the whole object if you prefer)
    events: [] as any[]
};

/**
 * Quick Panel data slice.
 */
export const quickPanelSlice = createSlice({
    name: 'quickPanel',
    initialState: { data: exampleData, open: false },
    reducers: {

        toggleQuickPanel: (state) => {
            state.open = !state.open;
        },
        openQuickPanel: (state) => {
            state.open = true;
        },
        closeQuickPanel: (state) => {
            state.open = false;
        }
    },
    selectors: {
        selectQuickPanelData: (state) => state.data,
        selectQuickPanelOpen: (state) => state.open
    }
});

/**
 * Lazy loading
 */
rootReducer.inject(quickPanelSlice);
const injectedSlice = quickPanelSlice.injectInto(rootReducer);
declare module '@/store/rootReducer' {
    export interface LazyLoadedSlices extends WithSlice<typeof quickPanelSlice> {}
}

export const { selectQuickPanelData, selectQuickPanelOpen } = injectedSlice.selectors;

export const { toggleQuickPanel, openQuickPanel, closeQuickPanel } = quickPanelSlice.actions;

export type dataSliceType = typeof quickPanelSlice;

export default quickPanelSlice.reducer;