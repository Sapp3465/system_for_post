import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { AuthState } from "@core/reducers/auth/auth.reducers";
import { SendLoginAction } from "@core/reducers/auth/auth.actions";
import { selectLoginError } from "@core/reducers/auth/auth.selectors";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponents {

  public loginForm : FormGroup = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200),
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]]
  })

  public get email(): AbstractControl | null {
    return this.loginForm.get('email')
  }

  public get emailError(): string {
    if(!this.email?.touched) return ''
    if (this.email.errors?.required) return 'Email field must not be empty'
    if (this.email.errors?.minLength) return 'Email is too small'
    if (this.email.errors?.maxLength) return 'Email is too large'
    if (this.email.errors?.pattern) return 'Invalid email'
    return ''
  }

  public get formIsInvalid(): boolean {
    return !!(this.email?.touched && !this.email?.errors)
  }

  public get loginIsSuccess(): boolean {
    return !!(this.email?.touched && !this.email?.errors)
  }

  public emailServerError$: Observable<string> = this.storage$.pipe( select( selectLoginError ) )

  constructor(private fb: FormBuilder, private storage$: Store<AuthState>) {
  }

  clickHandler() {
    this.storage$.dispatch(new SendLoginAction(this.loginForm.value));
  }
}
