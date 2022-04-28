import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-customer-add-order',
  templateUrl: './customer-add-order.component.html',
    styleUrls: [ './customer-add-order.component.scss', '../../../styles/common_dialog.components.scss' ]
})
export class CustomerAddOrderComponent {
  constructor(private dialogRef: MatDialogRef<CustomerAddOrderComponent>) {
  }
  public save() {

  }
}
