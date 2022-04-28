import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UserComponentsModule } from '../../components/index.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { TableOrdersRowComponents } from './table-orders-row/table-orders-row.components';
import { TableOrdersComponents } from './table-orders/table-orders.components';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MyPipesModule } from '@shared/pipes/my-pipes.module';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { SharedModule } from '@shared/shared.module';
import { AdminAddOrderComponent } from './admin-add-order/admin-add-order.component';
import { CustomerAddOrderComponent } from './customer-add-order/customer-add-order.component';

type ComponentsType =
  typeof TableOrdersRowComponents |
  typeof TableOrdersComponents |
  typeof EditOrderComponent |
  typeof AdminAddOrderComponent |
  typeof CustomerAddOrderComponent;

const components : ComponentsType[] = [
  TableOrdersRowComponents,
  TableOrdersComponents,
  EditOrderComponent,
  AdminAddOrderComponent,
  CustomerAddOrderComponent
];

@NgModule({
  declarations: [ components ],
  imports: [
    MatListModule, MatExpansionModule,
    MatIconModule, CommonModule,
    UserComponentsModule, MatDatepickerModule,
    MatMenuModule, MatNativeDateModule,
    MatCheckboxModule, MyPipesModule, SharedModule, MatDialogModule,
    MatSelectModule
  ],
  exports: [ components ]
})
export class OrdersComponentsModule {}
