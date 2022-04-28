import { Component, Input } from '@angular/core';

export interface ErrorMessageType {
  type: string,
  message: string
}

@Component({
  selector: 'app-loader-error',
  templateUrl: './loader-error.component.html',
  styleUrls: [ './loader-error.component.scss' ]
})
export class LoaderErrorComponent {
  @Input('message') messages: string;

}
