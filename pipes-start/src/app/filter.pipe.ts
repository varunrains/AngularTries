import { Pipe, PipeTransform } from '@angular/core';

@
Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propertyNameToFilter: string): any {
    const filteredList = [];
    for (let detail of value) {
      if (detail[propertyNameToFilter] === filterString || filterString==='') {
        filteredList.push(detail);
      }
    }
    return filteredList;
  }

}
