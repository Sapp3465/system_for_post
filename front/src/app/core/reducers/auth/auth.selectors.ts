import { createFeatureSelector, createSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';

import { authNode, AuthState, StatusType } from './auth.reducers';

export type AuthFeatureType = MemoizedSelector<object, AuthState, DefaultProjectorFn<AuthState>>;
export type IsAuthSelectorType = MemoizedSelector<object, boolean, DefaultProjectorFn<boolean>>;
export type StringUserSelectorType = MemoizedSelector<object, string, DefaultProjectorFn<string>>;
export type StatusSelectorType = MemoizedSelector<object, StatusType, DefaultProjectorFn<StatusType>>;

export const selectorAuthFeature: AuthFeatureType = createFeatureSelector<AuthState>( authNode );

export const selectIsAuth: IsAuthSelectorType = createSelector( selectorAuthFeature,
  (state: AuthState): boolean => state.isRegisteredUser);

export const selectStatusAuth: StatusSelectorType = createSelector( selectorAuthFeature,
  (state: AuthState): StatusType => state.status);

export const selectUserStatus: StringUserSelectorType = createSelector( selectorAuthFeature,
  (state: AuthState): string => state.status);

export const selectLoginError: StringUserSelectorType = createSelector( selectorAuthFeature,
  (state: AuthState): string => state.loginError);

export const selectRegistrationError: StringUserSelectorType = createSelector( selectorAuthFeature,
  (state: AuthState): string => state.registrationError);

export const selectDigitError: StringUserSelectorType = createSelector( selectorAuthFeature,
  (state: AuthState): string => state.digitError);
