import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '@core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserCustomerGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {
  }

  canActivate(): boolean {
    const userStatus = this._authService.getStatus;
    if (userStatus === 'admin') return true;

    this._router.navigate(['/user/orders']);
    return false;
  }

}
