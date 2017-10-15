import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'br'
})
export class BrPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value.replace(/\\n/g, '<br>');
  }

}
