import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { selectRegistrationError } from '@core/reducers/auth/auth.selectors';
import { AuthState } from '@core/reducers/auth/auth.reducers';
import { SendRegistrationAction } from '@core/reducers/auth/auth.actions';
import { PlatformService, PlatformType } from '@core/services/platform/platform.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: [ './registration.component.scss' ]
})
export class RegistrationComponents {

  public get email(): AbstractControl | null {
    return this.registrationForm.get('email')
  }

  public get no(): AbstractControl | null | undefined {
    return this.registrationForm.get('no')
  }

  public get name(): AbstractControl | null | undefined {
    return this.registrationForm.get('name')
  }

  public get address(): AbstractControl | null | undefined {
    return this.registrationForm.get('address')
  }

  public get contactName(): AbstractControl | null | undefined {
    return this.registrationForm.get('contactName')
  }

  public get days(): AbstractControl | null | undefined {
    return this.registrationForm.get('days')
  }

  public get phone(): AbstractControl | null | undefined {
    return this.registrationForm.get('phone')
  }

  public registrationServerError$: Observable<string> = this.storage$.pipe(select(selectRegistrationError))

  public registrationForm: FormGroup = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200),
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]],
    no: ['', [
      Validators.required,
      Validators.maxLength(20),
    ]],
    name: ['', [
      Validators.required,
      Validators.maxLength(50),
    ]],
    address: ['', [
      Validators.required,
      Validators.maxLength(50),
    ]],
    contactName: ['', [
      Validators.required,
      Validators.maxLength(50),
    ]],
    days: [{
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      san: false
    }],
    phone: ['']
  })

  public get emailError(): string {
    if (!this.email?.touched) return ''
    if (this.email.errors?.required) return 'Email field must not be empty'
    if (this.email.errors?.minLength) return 'Email is too small'
    if (this.email.errors?.maxLength) return 'Email is too large'
    if (this.email.errors?.pattern) return 'Invalid email'
    return ''
  }

  public get noError(): string {
    if (!this.no?.touched) return ''
    if (this.no.errors?.required) return 'No field must not be empty'
    if (this.no.errors?.maxLength) return 'No is too large'
    return ''
  }

  public get nameError(): string {
    if (!this.name?.touched) return ''
    if (this.name.errors?.required) return 'No field must not be empty'
    if (this.name.errors?.maxLength) return 'No is too large'
    return ''
  }

  public get addressError(): string {
    if (!this.address?.touched) return ''
    if (this.address.errors?.required) return 'No field must not be empty'
    if (this.address.errors?.maxLength) return 'No is too large'
    return ''
  }

  public get contactNameError(): string {
    if (!this.contactName?.touched) return ''
    if (this.contactName.errors?.required) return 'No field must not be empty'
    if (this.contactName.errors?.maxLength) return 'No is too large'
    return ''
  }

  public get formHasError(): boolean {
    return this.registrationForm.invalid
  }

  public currentPlatform: PlatformType;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private storage$: Store<AuthState>,
    private platformService: PlatformService
    ) {
    this.currentPlatform = platformService.platform
  }

  clickHandler() {
    this.storage$.dispatch(new SendRegistrationAction(this.registrationForm.value));
  }
}
