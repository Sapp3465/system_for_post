import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-admin-add-order',
  templateUrl: './admin-add-order.component.html',
    styleUrls: [ './admin-add-order.component.scss', '../../../styles/common_dialog.components.scss' ]
})
export class AdminAddOrderComponent {
  constructor(private dialogRef: MatDialogRef<AdminAddOrderComponent>) {
  }
  public save() {

  }
}
