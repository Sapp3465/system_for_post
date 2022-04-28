import { Action } from '@ngrx/store';

import { AuthResponse, Code, EmailType, RegistrationType, Error } from '@core/services/auth/auth.service';
import { StatusType } from '@core/reducers/auth/auth.reducers';

export enum authActionsType {
  logout = '[AUTH] logout', //to reducer
  login = '[AUTH] login', //to reducer
  setLoginData = '[AUTH] set status and authorize', //to reducer
  sendLogin = '[AUTH] send login', //to effects
  sendRegistration = '[AUTH] send registration', //to effects
  sendLoginDigits = '[AUTH] send login digits', //to effects
  sendRegistrationDigits = '[AUTH] send registration digits', //to effects
  setLoginError = '[AUTH] set login error', //to reducer
  setRegistrationError = '[AUTH] set registration error', //to reducer
  setDigitsError = '[AUTH] set digits error', //to reducer
  logoutAndDeleteLocalstorage = '[AUTH] logout and delete', //to effects
  removeLoginError = '[AUTH] remove login error', //to reducer
  removeRegistrationError = '[AUTH] remove registration error', //to reducer
  loadFromLocalStorage = '[Auth] load status and authorize from localstorage', //to effect
}

export interface LoginData {
  isRegisteredUser: boolean,
  status: StatusType,
}

export class LogoutAction implements Action {
  readonly type = authActionsType.logout;
}

export class LoginAction implements Action {
  readonly type = authActionsType.login;

  constructor( public payload: AuthResponse ) {
  }
}

export class SetLoginDataAction implements Action {
  readonly type = authActionsType.setLoginData;

  constructor( public payload: LoginData ) {
  }
}

export class SendLoginAction implements Action {
  readonly type = authActionsType.sendLogin;

  constructor( public payload: EmailType ) {
  }
}

export class SendRegistrationAction implements Action {
  readonly type = authActionsType.sendRegistration;

  constructor( public payload: RegistrationType ) {
  }
}

export class SendLoginDigitsAction implements Action {
  readonly type = authActionsType.sendLoginDigits;

  constructor( public payload: Code ) {
  }
}

export class SendRegistrationDigitsAction implements Action {
  readonly type = authActionsType.sendRegistrationDigits;

  constructor( public payload: Code ) {
  }
}

export class SetLoginErrorAction implements Action {
  readonly type = authActionsType.setLoginError;

  constructor( public payload: Error ) {
  }
}

export class SetRegistrationErrorAction implements Action {
  readonly type = authActionsType.setRegistrationError;

  constructor( public payload: Error ) {
  }
}

export class SetDigitsErrorAction implements Action {
  readonly type = authActionsType.setDigitsError;

  constructor( public payload: Error ) {
  }
}

export class LogoutAndDeleteAction implements Action {
  readonly type = authActionsType.logoutAndDeleteLocalstorage;
}

export class RemoveLoginErrorAction implements Action {
  readonly type = authActionsType.removeLoginError;
}

export class RemoveRegistrationErrorAction implements Action {
  readonly type = authActionsType.removeRegistrationError;
}

export class LoadFromLocalstorageAction implements Action {
  readonly type = authActionsType.loadFromLocalStorage;
}

export type AuthActions =
  LogoutAction |
  LoginAction |
  SendLoginAction |
  SendRegistrationAction |
  SendLoginDigitsAction |
  SendRegistrationDigitsAction |
  SetLoginErrorAction |
  SetRegistrationErrorAction |
  SetDigitsErrorAction |
  LogoutAndDeleteAction |
  RemoveLoginErrorAction |
  RemoveRegistrationErrorAction |
  SetLoginDataAction |
  LoadFromLocalstorageAction;
