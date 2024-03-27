import { Pipe, PipeTransform } from '@angular/core';

@Pipe({

  name: 'nullWithDefault'

})

export class NullWithDefaultPipe implements PipeTransform {

  

  transform(value: any, defaultText = 'N/A'): any {

    if (typeof value === 'undefined' || value === null || value === '') {

      return defaultText;

    }  

    return value;

  }

  

}