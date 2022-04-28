import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-button',
  templateUrl: './header-button.component.html',
  styleUrls: ['./header-button.component.scss']
})
export class HeaderButtonComponents {
  @Input('color') color: string;
  @Input('active') active: boolean;
  @Input('name') name: string;
  @Input('icon') icon: string;
  @Input('isFull') isFull: boolean = true;
}
