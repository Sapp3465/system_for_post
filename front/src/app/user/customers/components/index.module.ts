import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveComponentModule } from '@ngrx/component';
import { CommonModule } from '@angular/common';

import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { UserComponentsModule } from '../../components/index.module';
import { SharedModule } from '@shared/shared.module';

type ComponentsType =
  typeof AddCustomerComponent |
  typeof EditCustomerComponent;

const components : ComponentsType[] = [
  AddCustomerComponent,
  EditCustomerComponent
];

@NgModule({
  declarations: [ components ],
  imports: [
    MatDialogModule, UserComponentsModule, SharedModule, MatCheckboxModule, MatInputModule, ReactiveFormsModule,
    ReactiveComponentModule, CommonModule
  ],
  exports: [ components ]
})
export class CustomersComponentsModule {}
