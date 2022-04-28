import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {DigitsViewComponent, PageNotFoundComponent, PrintOrderComponent} from '@shared/components';

const routes: Routes = [
  {
    path: '', redirectTo: '/user', pathMatch: 'full'
  },
  {
    path: 'user', loadChildren: () => import('./user/user.module')
      .then(m => m.UserModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: 'digitsView/:code', component: DigitsViewComponent
  },
  {
    path: 'printOrder', component: PrintOrderComponent
  },
  {
    path : '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
export type AppRoutingComponentsType =
  typeof PageNotFoundComponent
  | typeof DigitsViewComponent
  | typeof PrintOrderComponent;
export const AppRoutingComponents : AppRoutingComponentsType[] =
  [PageNotFoundComponent, DigitsViewComponent, PrintOrderComponent];
