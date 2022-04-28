import { Pipe, PipeTransform } from '@angular/core';
import {DaysType, OneDayType} from "@shared/components";

@Pipe({
  name: 'days'
})
export class DaysPipe implements PipeTransform {

  private capitalize(day : OneDayType): string {
    return day[0].toUpperCase() + day.slice(1);
  }

  public transform(value?: DaysType): string {
    let days = '';
    for (let day in value) {
      const key = day as OneDayType;
      if(value[key]){
        if(!days) days += this.capitalize(key);
        else days += ', ' + this.capitalize(key);
      }
    }
    return days;
  }
}
