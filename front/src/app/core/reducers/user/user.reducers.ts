import {ActionReducer} from '@ngrx/store';

import {UserActions, userActionsType} from '@core/reducers/user/user.actions';
import {DataTableCustomers} from '../../../user/customers/customers.components';
import {DataTableProducts} from "../../../user/catalog/catalog.components";

export type UserNodeType = 'user';
export const userNode: UserNodeType = 'user';

export type PageType = 'orders' | 'catalog' | 'customers';

export interface UserState {
  currentPage: PageType,
  isOpenMenu: boolean,
}

const initialState: UserState = {
  currentPage: 'catalog',
  isOpenMenu: true,
};

export const userReducer: ActionReducer<UserState, UserActions> =
  (state: UserState = initialState, action: UserActions): UserState => {
    switch (action.type) {
      case userActionsType.changeCurrentPage:
        return { ...state, currentPage: action.payload }
      case userActionsType.changeMenuOpen:
        return { ...state, isOpenMenu: !state.isOpenMenu }
      default:
        return state;
    }
  }
