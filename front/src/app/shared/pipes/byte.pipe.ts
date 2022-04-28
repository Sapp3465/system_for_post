import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byte'
})
export class BytePipe implements PipeTransform {

  transform(value?: number): string {
    if(!value) return '';

    const KB = Math.ceil(value / 10**3);
    if(KB === 1) return value + 'B';

    const MB = Math.ceil(value / 10**6);
    if(MB === 1) return KB + 'KB';

    const GB = Math.ceil(value / 10**9);
    if(GB === 1) return MB + 'MB';

    return GB + 'GB';
  }
}
