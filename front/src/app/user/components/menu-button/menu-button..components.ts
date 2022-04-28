import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button..component.scss']
})
export class MenuButtonComponents {
  @Input('isFull') isFull : boolean;
  @Input('active') active : boolean;
  @Input('icon') icon : string;
  @Input('text') text : string;
  @Output('click') click = new EventEmitter<MouseEvent>();

  public clickHandler(event : MouseEvent): void {
    this.click.emit(event);
  }
}
