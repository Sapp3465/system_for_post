import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-header-input',
  templateUrl: './header-input.component.html',
  styleUrls: [ './header-input.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HeaderInputComponents),
      multi: true
    }
  ]
})
export class HeaderInputComponents implements ControlValueAccessor {
  @Input('placeholder') placeholder: string = '';
  @Output('onBlur') onBlur: EventEmitter<void> = new EventEmitter<void>();

  public isFocused: boolean = false
  public val: string = '';

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

  public onChange: (val: string) => void = (val: string) => {};
  public onTouched: () => void = () => {};

  public writeValue(value: string): void{
    this.value = value
  }

  public registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public blur():void {
    this.isFocused = false;
    this.onBlur.emit();
  }

  public del(): void {
    this.value = ''
    this.onChange('')
    this.onTouched()
  }

}
