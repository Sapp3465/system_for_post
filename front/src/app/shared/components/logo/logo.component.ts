import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <img *ngIf="isFull; else shortImg" [ngStyle]="{ height: height + 'px' }" src="assets/fullLogo.png">
    <ng-template #shortImg>
      <img  [ngStyle]="{ height: height + 'px' }" src="assets/logo.png">
    </ng-template>
  `
})
export class LogoComponent{
  @Input('isFull') isFull : boolean;
  @Input('height') height : string = '40';

}
