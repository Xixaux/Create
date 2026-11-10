import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from 'src/store/store';
import { PartialDeep } from 'type-fest';
import { CreateFlatNavItemType, CreateNavItemType } from '@create/core/CreateNavigation/types/CreateNavItemType';
import CreateNavigationHelper from '@create/utils/CreateNavigationHelper';
import CreateNavItemModel from '@create/core/CreateNavigation/models/CreateNavItemModel';
import navigationConfig from 'src/configs/navigationConfig';

const navigationAdapter = createEntityAdapter<CreateFlatNavItemType>();

const emptyInitialState = navigationAdapter.getInitialState([]);

const initialState = navigationAdapter.upsertMany(
	emptyInitialState,
	CreateNavigationHelper.flattenNavigation(navigationConfig)
);

/**
 * Redux Thunk actions related to the navigation store state
 */
/**
 * Appends a navigation item to the navigation store state.
 */
export const appendNavigationItem =
	(item: CreateNavItemType, parentId?: string | null): AppThunk =>
	async (dispatch, getState) => {
		const AppState = getState();
		const navigation = CreateNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));

		dispatch(setNavigation(CreateNavigationHelper.appendNavItem(navigation, CreateNavItemModel(item), parentId)));

		return Promise.resolve();
	};

/**
 * Prepends a navigation item to the navigation store state.
 */
export const prependNavigationItem =
	(item: CreateNavItemType, parentId?: string | null): AppThunk =>
	async (dispatch, getState) => {
		const AppState = getState();
		const navigation = CreateNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));

		dispatch(setNavigation(CreateNavigationHelper.prependNavItem(navigation, CreateNavItemModel(item), parentId)));

		return Promise.resolve();
	};

/**
 * Adds a navigation item to the navigation store state at the specified index.
 */
export const updateNavigationItem =
	(id: string, item: PartialDeep<CreateNavItemType>): AppThunk =>
	async (dispatch, getState) => {
		const AppState = getState();
		const navigation = CreateNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));

		dispatch(setNavigation(CreateNavigationHelper.updateNavItem(navigation, id, item)));

		return Promise.resolve();
	};

/**
 * Removes a navigation item from the navigation store state.
 */
export const removeNavigationItem =
	(id: string): AppThunk =>
	async (dispatch, getState) => {
		const AppState = getState();
		const navigation = CreateNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));

		dispatch(setNavigation(CreateNavigationHelper.removeNavItem(navigation, id)));

		return Promise.resolve();
	};

export const {
	selectAll: selectNavigationAll,
	selectIds: selectNavigationIds,
	selectById: selectNavigationItemById
} = navigationAdapter.getSelectors<RootState>((state) => state.navigation);

/**
 * The navigation slice
 */
export const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		setNavigation(state, action: PayloadAction<CreateNavItemType[]>) {
			return navigationAdapter.setAll(state, CreateNavigationHelper.flattenNavigation(action.payload));
		},
		resetNavigation: () => initialState
	}
});

export const { setNavigation, resetNavigation } = navigationSlice.actions;

export type navigationSliceType = typeof navigationSlice;

export default navigationSlice.reducer;
