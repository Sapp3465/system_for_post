import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponents } from './auth.components';
import { RegistrationComponents } from './registration/registration.components';
import { LoginDigitsComponents } from './login-digits/login-digits.components';
import { LoginComponents } from './login/login.components';
import { AuthLoginGuard } from '@core/services/auth/auth-login.guard';

const routes: Routes = [
  {
    path: '', component : AuthComponents , children: [
      {
        path: 'login', component: LoginComponents
      },
      {
        path: 'registration',
        component: RegistrationComponents
      },
      {
        path: 'loginDigits/:type', component: LoginDigitsComponents
      }
    ], canActivate: [ AuthLoginGuard ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}

export type AuthComponentsType =
  typeof RegistrationComponents |
  typeof LoginDigitsComponents |
  typeof LoginComponents;

export const AuthRoutingComponents: AuthComponentsType[] = [
  RegistrationComponents,
  LoginDigitsComponents,
  LoginComponents
]
