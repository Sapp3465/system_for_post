import {Component, forwardRef, Input, OnInit} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: [ './custom-select.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    }
  ]
})
export class CustomSelectComponent implements ControlValueAccessor {
  @Input('title') title: string = '';
  @Input('options') options: string[] = [];
  @Input('invalid') invalid: string = '';

  public isFocused: boolean = false
  public value: string = '';

  private setValue(value: string): void {
      this.onChange(value)
      this.onTouched()
  }

  public onChange: (val: string) => void = () => {};
  public onTouched: () => void = () => {};

  public writeValue(value: string): void{
    this.value = value;
  }

  public registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public changeValue(event: MatSelectChange) {
    this.setValue(event.value);
  }

  public onFocus(): void {
    this.isFocused = true;
    this.onTouched();
  }

  public onBlur(): void {
    this.isFocused = false;
  }

}
