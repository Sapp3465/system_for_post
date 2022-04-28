import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-pin-input',
  templateUrl: './pin-input.component.html',
  styleUrls: ['./pin-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PinInputComponent),
      multi: true
    }
  ]
})
export class PinInputComponent implements ControlValueAccessor{
  @Input('messageError') messageError: string = '';
  @Input('name') name: string = '';
  @Input('disabled') disabled: boolean = false;
  @Output('onEntered') onEntered = new EventEmitter<string>()
  @ViewChild('firstPinInput') firstPinInput?: ElementRef;
  @ViewChild('secondPinInput') secondPinInput?: ElementRef;

  public firstPin: string = '';
  public secondPin: string = '';
  public focused: boolean = false;

  public changeFirst(event : string): void{
    this.firstPin = event;
    //this.onChange(this.firstPin)
    //this.onTouched()
    if (this.firstPin.length === 3) this.secondPinInput?.nativeElement.focus();
  }

  public changeSecond(event : string): void{
    this.secondPin = event;
    //this.onChange(this.secondPin)
    //this.onTouched()
    if (this.secondPin.length === 0) this.firstPinInput?.nativeElement.focus();
    const pin = this.firstPin + this.secondPin;
    if(pin.length === 6){
      this.onEntered.emit(pin);
    }
  }

  public onChange: (val: string) => void;
  public onTouched: () => void;

  public writeValue(value: string): void{
    if( this.firstPin.length < 3 ) this.firstPin = value;
    else this.secondPin = value;
  }

  public registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}
