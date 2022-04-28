import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { UserState } from '@core/reducers/user/user.reducers';
import { ChangeMenuStatusAction } from '@core/reducers/user/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponents {
  @Input('name') name: string;

  constructor(private storage$: Store<UserState>) {
  }

  public clickHandler(): void {
    this.storage$.dispatch(new ChangeMenuStatusAction())
  }
}
