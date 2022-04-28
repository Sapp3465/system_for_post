import { Injectable, Injector } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

import { DoneSnackbarComponent } from "../../../user/catalog/components/done-snackbar/done-snackbar.component";
import { WaitSnackbarComponent } from "../../../user/catalog/components/wait-snackbar/wait-snackbar.component";
import { PlatformService } from "@core/services/platform/platform.service";

export type SnackbarType = 'done' | 'wait';

export interface SnackbarDataType {
  header: string,
  description: string
}

export interface SnackbarSettings {
  data: SnackbarDataType,
  horizontalPosition?: MatSnackBarHorizontalPosition,
  verticalPosition?: MatSnackBarVerticalPosition,
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private injector: Injector) {
  }
  public open(type: SnackbarType, header: string, description: string): void {
    const snackbar: MatSnackBar = this.injector.get(MatSnackBar);
    const platformService: PlatformService = this.injector.get(PlatformService);
    const settings: SnackbarSettings = {
      data: { header, description },
      horizontalPosition: platformService.platform === 'mobile' ? 'center': 'end',
      verticalPosition: platformService.platform === 'mobile' ? 'bottom': 'top'
    };

    if (type === 'done')
      snackbar.openFromComponent(DoneSnackbarComponent, {...settings, duration: 3000, panelClass: 'done-snack'});

    if (type === 'wait')
      snackbar.openFromComponent(WaitSnackbarComponent, {...settings, duration: 3000, panelClass: 'wait-snack'});
  }
}
