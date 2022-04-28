import { Action } from '@ngrx/store';

import { PageType } from '@core/reducers/user/user.reducers';

export enum userActionsType {
  changeMenuOpen = '[USER] change open menu status', //to reducer
  changeCurrentPage = '[USER] change current page', //to reducer
  toAnotherPage = '[USER] navigate to another page', //to effects
}

export class ChangeMenuStatusAction implements Action {
  readonly type = userActionsType.changeMenuOpen;
}

export class ChangeCurrentPageAction implements Action {
  readonly type = userActionsType.changeCurrentPage;

  constructor(public payload: PageType) {
  }
}

export class ToAnotherPageAction implements Action {
  readonly type = userActionsType.toAnotherPage;

  constructor(public payload: PageType) {
  }
}

export type UserActions =
  ChangeMenuStatusAction |
  ChangeCurrentPageAction |
  ToAnotherPageAction;
