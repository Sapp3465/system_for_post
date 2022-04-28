import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialog-bottom',
  templateUrl: './dialog-bottom.component.html',
  styleUrls: ['./dialog-bottom.component.scss']
})
export class DialogBottomComponent {
  @Input('name') name: string;

  constructor() {
  }

  public clickHandler(): void {

  }
}
