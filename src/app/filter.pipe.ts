import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchTerm: any): any {
    if (value.length === 0) {
      return value
    }
    return value.filter(function (search) {
      return search.name.toLowerCase().indexOf(searchTerm) > -1
            || search.address.city.toLowerCase().indexOf(searchTerm) > -1
    });
  }

}
