import { Pipe, PipeTransform } from '@angular/core';
import PokeDetails from '../models/poke-details';

@Pipe({
  name: 'types',
  standalone: true
})
export class TypesPipe implements PipeTransform {

  transform(value: PokeDetails): string {
    const types = value.types.map(({type}) => type.name);
    return types.join(' / ');
  }

}
