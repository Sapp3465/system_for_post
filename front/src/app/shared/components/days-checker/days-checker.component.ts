import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type OneDayType = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'san';

export interface DaysType {
  mon : boolean,
  tue : boolean,
  wed : boolean,
  thu : boolean,
  fri : boolean,
  sat : boolean,
  san : boolean,
}

@Component({
  selector: 'app-day-checker',
  templateUrl: './days-checker.component.html',
  styleUrls: ['./days-checker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DaysCheckerComponent),
    multi: true
  }]
})
export class DaysCheckerComponent implements ControlValueAccessor {

  public currentDays : DaysType = {
    mon : false,
    tue : false,
    wed : false,
    thu : false,
    fri : false,
    sat : false,
    san : false
  }

  public onChange: (val: DaysType) => void;
  public onTouched: () => void;

  public writeValue(value: DaysType): void{
    this.currentDays = value
  }

  public registerOnChange(fn: (val: DaysType) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
}
