import { Pipe, PipeTransform } from '@angular/core';

type ValidationType = 'empty' | 'min-length' | 'max-length';

@Pipe({
  name: 'validation'
})
export class ValidationErrorPipe implements PipeTransform {

  private allErrors: { [ key: string ]: string[] } = {
    'empty': [ ' field must not be empty' ],
    'min-length': [ ' is too small', '(must contain more then ', ' characters long)' ],
    'max-length': [ ' is too large', '(must be less than ', ' characters long)' ],
  };

  private lengthValid(value: string, type: ValidationType, another?: string): string {
    let tmp: string = value + this.allErrors[ type ][ 0 ];
    if (another)
      tmp += this.allErrors[ type ][ 1 ] + another + this.allErrors[ type ][ 2 ];
    return tmp;
  }

  public transform(value: string, type: ValidationType, another?: string): string {
    switch (type) {
      case 'empty':
        return value + this.allErrors[ type ][ 0 ];
      case 'min-length' :
        return this.lengthValid( value, type, another );
      case 'max-length' :
        return this.lengthValid( value, type, another );
      default :
        return `Error in ${ value }`;
    }
  }
}
