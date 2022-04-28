import {Component, forwardRef, Input, OnInit} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: [ './custom-input.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input('success') success: boolean;
  @Input('invalid') invalid: string = '';
  @Input('placeholder') placeholder: string = '';
  @Input('name') name: string = '';
  @Input('type') type: string = 'text';
  @Input('disabled') disabled: boolean = false;
  @Input('defaultValue') defaultValue: string = '';
  public val: string;

  public isFocused: boolean = false

  public setFocus(): void {
    this.isFocused = true
    this.onTouched()
  }

  setValue() {
      this.onChange(this.val)
      this.onTouched()
  }


  public onChange: (val: string) => void = () => {};
  public onTouched: () => void = () => {};

  public writeValue(value: string): void{
    this.val = value;
    this.setValue()
  }

  public registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}
