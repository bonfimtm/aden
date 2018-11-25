import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'br'
})
export class BrPipe implements PipeTransform {

  transform(value: string, _?: any): any {
    if (value) {
      return value.replace(/\\n/g, '<br>');
    } else {
      return value;
    }
  }

}
