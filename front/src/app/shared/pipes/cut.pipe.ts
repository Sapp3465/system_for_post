import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cut'
})
export class CutPipe implements PipeTransform {
  public transform(value: string, howMany: number): string {
    if(value.length <= howMany) return value;
    return value.slice(0, howMany) + '...';
  }
}
