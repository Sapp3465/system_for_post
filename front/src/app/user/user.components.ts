import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { AuthState } from '@core/reducers/auth/auth.reducers';
import { LoadFromLocalstorageAction } from '@core/reducers/auth/auth.actions';
import { ChangeMenuStatusAction, ToAnotherPageAction } from '@core/reducers/user/user.actions';
import { UserState } from '@core/reducers/user/user.reducers';
import { PlatformService } from '@core/services/platform/platform.service';

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponents implements OnInit{
  constructor(
    private authStorage: Store<AuthState>,
    private router: Router,
    private userStorage: Store<UserState>,
    private platformService: PlatformService
  ) {
  }

  public ngOnInit(): void {
    this.authStorage.dispatch(new LoadFromLocalstorageAction())

    if(this.platformService.platform !== 'desktop')
      this.userStorage.dispatch(new ChangeMenuStatusAction());

    const arrURL = this.router.url.split('/');
    const currentPage: string = arrURL[arrURL.length - 1];
    if(currentPage === 'customers' || currentPage === 'orders' || currentPage === 'catalog')
      this.userStorage.dispatch(new ToAnotherPageAction(currentPage))
  }
}
