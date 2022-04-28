import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-textarea',
  templateUrl: './custom-textarea.component.html',
  styleUrls: [ './custom-textarea.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomTextareaComponent),
      multi: true
    }
  ]
})
export class CustomTextareaComponent implements ControlValueAccessor {
  @Input('invalid') invalid: string = '';
  @Input('placeholder') placeholder: string = '';
  @Input('name') name: string = '';
  public val: string = '';

  public isFocused: boolean = false

  public setFocus(): void {
    this.isFocused = true
    this.onTouched()
  }

  public set value(val : string) {
    if (val !== undefined && this.val !== val) {
      this.val = val
      this.onChange(val)
      this.onTouched()
    }
  }


  public onChange: (val: string) => void = () => {};
  public onTouched: () => void = () => {};

  public writeValue(value: string): void{
    this.value = value
  }

  public registerOnChange(fn: (val: string) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
}
