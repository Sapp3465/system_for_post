import { createFeatureSelector, createSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';

import { userNode, UserState, PageType } from './user.reducers';

export type UserFeatureType = MemoizedSelector<object, UserState, DefaultProjectorFn<UserState>>;
export type PageSelectorType = MemoizedSelector<object, PageType, DefaultProjectorFn<PageType>>;
export type IsOpenSelectorType = MemoizedSelector<object, boolean, DefaultProjectorFn<boolean>>;

export const selectorUserFeature: UserFeatureType = createFeatureSelector<UserState>( userNode );

export const selectCurrentPage: PageSelectorType = createSelector( selectorUserFeature,
  (state: UserState): PageType => state.currentPage);

export const selectIsOpenMenu: IsOpenSelectorType = createSelector( selectorUserFeature,
  (state: UserState): boolean => state.isOpenMenu);

