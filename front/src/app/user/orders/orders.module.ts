import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveComponentModule } from '@ngrx/component';

import { OrdersComponents } from './orders.components';
import { OrdersRoutingModule } from './orders-routing.module';
import { UserComponentsModule } from '../components/index.module';
import { OrdersComponentsModule } from './components/index.module';

@NgModule({
  declarations: [
    OrdersComponents
  ],
  imports: [
    OrdersRoutingModule,
    UserComponentsModule,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    OrdersComponentsModule,
    ReactiveComponentModule
  ],
  providers: []
})
export class OrdersModule { }
