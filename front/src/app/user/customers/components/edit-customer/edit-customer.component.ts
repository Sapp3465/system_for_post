import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { DataTableCustomers } from '../../customers.components';
import { EditAddProductComponent } from '../../../catalog/components/edit-add-product/edit-add-product.component';
import { CustomersState } from '@core/reducers/customers/customers.reducers';
import { selectCustomersError } from '@core/reducers/customers/customers.selector';
import { EditCustomerAction } from '@core/reducers/customers/customers.actions';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss', '../../../styles/common_dialog.components.scss']
})
export class EditCustomerComponent implements OnDestroy{
  public customerForm = this.fb.group({
    id: [this.data.id],
    no: [this.data.no, [Validators.required, Validators.maxLength(40)]],
    deliveryDays: [{ ...this.data.deliveryDays }]
  })

  public serverError: string = '';
  private sendToServer: boolean = false
  private message$: Subscription = this.userStorage.pipe(select(selectCustomersError)).subscribe((data: string) => {
    if(this.sendToServer){
      this.sendToServer = false;
      if(!data.trim()) this.dialogRef.close();
    }
    if(data.trim()) this.serverError = data;
  })

  public get no(): AbstractControl | null {
    return this.customerForm.get('no');
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataTableCustomers,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditAddProductComponent>,
    private userStorage: Store<CustomersState>,
    ) {
  }

  public saveData(): void {
    this.sendToServer = true;
    this.userStorage.dispatch(new EditCustomerAction(this.customerForm.value))
  }

  public ngOnDestroy(): void {
    this.message$.unsubscribe();
  }
}
