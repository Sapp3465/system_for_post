import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {
  }

  public canActivate(): boolean {
    const userStatus = this._authService.getStatus;
    if (userStatus === '' || userStatus === null) return true;

    this._router.navigate([ '/user/orders' ]);
    return false;
  }

}
