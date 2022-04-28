import { ActionReducerMap } from '@ngrx/store';

import { authNode, authReducer, AuthState } from '@core/reducers/auth/auth.reducers';
import { AuthActions } from '@core/reducers/auth/auth.actions';
import { AuthEffects } from '@core/reducers/auth/auth.effects';
import { userNode, userReducer, UserState } from '@core/reducers/user/user.reducers';
import { UserActions } from '@core/reducers/user/user.actions';
import { UserEffects } from '@core/reducers/user/user.effects';
import { customersNode, customersReducer, CustomersState } from '@core/reducers/customers/customers.reducers';
import { CustomersEffects } from '@core/reducers/customers/customers.effects';
import { CustomersActions } from '@core/reducers/customers/customers.actions';
import { catalogNode, catalogReducer, CatalogState } from '@core/reducers/catalog/catalog.reducers';
import { CatalogEffects } from '@core/reducers/catalog/catalog.effects';
import { CatalogActions } from '@core/reducers/catalog/catalog.actions';

export interface State {
  [authNode]: AuthState,
  [userNode]: UserState,
  [customersNode]: CustomersState,
  [catalogNode]: CatalogState
}

export type GlobalActionType = AuthActions & UserActions & CustomersActions & CatalogActions;

export const reducers : ActionReducerMap<State, GlobalActionType> = {
  [authNode]: authReducer,
  [userNode]: userReducer,
  [customersNode]: customersReducer,
  [catalogNode]: catalogReducer
}

export const effects = [ AuthEffects, UserEffects, CustomersEffects, CatalogEffects ];
