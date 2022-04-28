import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: [ './custom-button.component.scss' ]
})
export class CustomButtonComponent {
  @Input('disabled') disabled : boolean;
  @Input('icon') icon ?: string;
  @Input('color') color : 'blue' | 'red' | 'invisible' | 'invisibleBlue' = 'blue';
  @Input('text') text : string = '';
  @Output() onClick = new EventEmitter<MouseEvent>()

  public clickButton(event: MouseEvent): void {
    if (!this.disabled){
      this.onClick.emit(event)
    }
  }
}
