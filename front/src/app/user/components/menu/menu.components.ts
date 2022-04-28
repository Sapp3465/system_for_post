import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectCurrentPage, selectIsOpenMenu } from '@core/reducers/user/user.selector';
import { ToAnotherPageAction } from '@core/reducers/user/user.actions';
import { selectUserStatus } from '@core/reducers/auth/auth.selectors';
import { AuthState } from '@core/reducers/auth/auth.reducers';
import { LogoutAndDeleteAction } from '@core/reducers/auth/auth.actions';
import { PageType, UserState } from '@core/reducers/user/user.reducers';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponents{
  public currentPage$ : Observable<PageType> = this.userStorage$.pipe(select(selectCurrentPage))

  public isOpenMenu$ : Observable<boolean> = this.userStorage$.pipe(select(selectIsOpenMenu))

  public userStatus$ : Observable<string> = this.userStorage$.pipe(select(selectUserStatus))

  constructor(private userStorage$: Store<UserState>, private authStorage$: Store<AuthState>) {
  }

  public toCatalog(): void {
    this.userStorage$.dispatch(new ToAnotherPageAction('catalog'))
  }

  public toOrders(): void {
    this.userStorage$.dispatch(new ToAnotherPageAction('orders'))
  }

  public toCustomers(): void {
    this.userStorage$.dispatch(new ToAnotherPageAction('customers'))
  }

  public logout(): void {
    this.authStorage$.dispatch(new LogoutAndDeleteAction())
  }

}
