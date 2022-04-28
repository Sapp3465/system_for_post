import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { AuthState } from '@core/reducers/auth/auth.reducers';
import { SendLoginDigitsAction, SendRegistrationDigitsAction } from '@core/reducers/auth/auth.actions';
import { selectDigitError } from '@core/reducers/auth/auth.selectors';
import { LoadingService } from '@core/services/loading/loading.service';

@Component({
  selector: 'app-registration-digits',
  templateUrl: './login-digits.component.html',
  styleUrls: [ './login-digits.component.scss' ]
})
export class LoginDigitsComponents implements OnInit{
  public pageType: 'registration' | 'login';

  public serverErrorMessage$ = this.storage.pipe( select( selectDigitError ) )

  constructor(
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private storage: Store<AuthState>,
    public loadingService: LoadingService
  ) {
  }

  public ngOnInit(): void {
    const typeFromUrl = this.activatedRoute.snapshot.paramMap.get('type');
    if (typeFromUrl === 'registration' || typeFromUrl === 'login')
      this.pageType = typeFromUrl;
    else this.router.navigate([ '/auth/login' ])
  }

  public onEvent(event : string): void {
    if (this.pageType === 'login')
      this.storage.dispatch(new SendLoginDigitsAction({ secretKey: event }))

    if (this.pageType === 'registration')
      this.storage.dispatch(new SendRegistrationDigitsAction({ secretKey: event }))

  }

}
