import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponents } from './user.components';
import { AuthUnloginGuard } from '@core/services/auth/auth-unlogin.guard';
import { UserCustomerGuard } from '@core/services/user/users-customer.guard';

const routes: Routes = [
  {
    path: '', component: UserComponents, children: [
      {
        path: 'catalog', loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule)
      },
      {
        path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule),
        canActivate: [ UserCustomerGuard ]
      },
      {
        path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
      }
    ], canActivate: [ AuthUnloginGuard ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
