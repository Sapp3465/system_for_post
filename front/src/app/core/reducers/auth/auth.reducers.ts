import { ActionReducer } from '@ngrx/store';

import {AuthActions, authActionsType} from '@core/reducers/auth/auth.actions';

export type AuthNodeType = 'auth';
export const authNode: AuthNodeType = 'auth';

export type StatusType = 'admin' | 'customer' | '';

export interface AuthState {
  isRegisteredUser: boolean,
  status: StatusType,
  loginError: string,
  registrationError: string,
  digitError: string
}

const initialState: AuthState = {
  isRegisteredUser: false,
  status: '',
  loginError: '',
  registrationError: '',
  digitError: '',
};

export const authReducer: ActionReducer<AuthState, AuthActions> =
  (state: AuthState = initialState, action: AuthActions): AuthState => {
    switch (action.type) {
      case authActionsType.logout: return { ...state, isRegisteredUser: false, status: '' }
      case authActionsType.login: return { ...state, isRegisteredUser: true, status: action.payload.status }
      case authActionsType.setLoginError: return { ...state, loginError: action.payload.message }
      case authActionsType.setRegistrationError: return { ...state, registrationError: action.payload.message }
      case authActionsType.setDigitsError: return { ...state, digitError: action.payload.message }
      case authActionsType.removeLoginError: return { ...state, loginError: '' }
      case authActionsType.removeRegistrationError: return { ...state, registrationError: '' }
      case authActionsType.setLoginData:
        return { ...state, isRegisteredUser: action.payload.isRegisteredUser, status: action.payload.status }
      default:
        return state;
    }
  }
