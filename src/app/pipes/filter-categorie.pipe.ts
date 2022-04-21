import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategorie',
  pure: false
})
export class FilterCategoriePipe implements PipeTransform {

  transform(items: any[], filter: any): any {
    if (!items || !filter) {
        return items;
    }
    return items.filter(item => item.categorie.indexOf(filter.categorie) !== -1);
}

}
