import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'Boolean'
})
export class BooleanPipe implements PipeTransform {

    transform(value: any, args?: any): any {
      if (value === 'true') {
        return '启用';
      }
      if (value === 'false') {
        return '禁用';
      }
      if (value === true) {
        return '启用';
      }
      if (value === false) {
        return '启用';
      }
        return null;
    }

}
