import { Component, Output, EventEmitter, Input } from '@angular/core';

export interface ErrorMessageType {
  type: string,
  message: string
}

@Component({
  selector: 'app-file-loader',
  templateUrl: './file-loader.component.html',
  styleUrls: [ './file-loader.component.scss' ]
})
export class FileLoaderComponent {

  @Output('onFileLoad') onFileLoad: EventEmitter<File> = new EventEmitter<File>();
  @Output('onDataLoad') onDataLoad: EventEmitter<string | ArrayBuffer | null> =
    new EventEmitter<string | ArrayBuffer | null>();
  @Input('messages') messages: string[] = []
  @Input('disabled') disabled: boolean = false

  public file: File | null = null;
  public isLoaded: boolean = false;

  constructor() {
  }

  public onSelect(event: any): void {
    const file = event.addedFiles[0];
    const format = file.name.split('.')[1];
    if(format !== 'csv'){
      this.messages.push('Your file format is not .csv')
      return
    }

    this.file = file;
    this.onFileLoad.emit(file);
    this.isLoaded = true

    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.onDataLoad.emit(fileReader.result);
    }
    if(this.file)
      fileReader.readAsText(this.file, 'UTF-8');
  }

  public removeFile(): void {
    if(!this.disabled) {
      this.file = null;
      this.isLoaded = false;
    }
  }
}
