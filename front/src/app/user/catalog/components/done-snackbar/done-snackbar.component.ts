import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';
import {SnackbarDataType} from "@core/services/snackbar/snackbar.service";

@Component({
  selector: 'app-done-snackbar',
  templateUrl: './done-snackbar.component.html',
  styleUrls: [ './done-snackbar.component.scss' ]
})
export class DoneSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackbarDataType,
    private snackbarRef: MatSnackBarRef<DoneSnackbarComponent>) { }

    public close():void {
      this.snackbarRef.dismiss();
    }
}
