import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

import { DoneSnackbarComponent } from '../done-snackbar/done-snackbar.component';
import { SnackbarDataType } from '@core/services/snackbar/snackbar.service';

@Component({
  selector: 'app-wait-snackbar',
  templateUrl: './wait-snackbar.component.html',
  styleUrls: ['./wait-snackbar.component.scss']
})
export class WaitSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackbarDataType,
    private snackbarRef: MatSnackBarRef<DoneSnackbarComponent>) { }

  public close(): void {
    this.snackbarRef.dismiss();
  }
}
