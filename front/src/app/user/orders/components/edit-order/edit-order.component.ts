import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { OrderData } from '../../orders.components';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss', '../../../styles/common_dialog.components.scss']
})
export class EditOrderComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: OrderData,
              private dialogRef: MatDialogRef<EditOrderComponent>) {
  }

  public save() {

  }
}
