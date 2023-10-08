import { Pipe, PipeTransform } from '@angular/core';
import {Pokemon} from '@poke-team-builder/models';

@Pipe({
  name: 'types',
  standalone: true
})
export class TypesPipe implements PipeTransform {

  transform(value: Pokemon): string {
    const types = value.types.map(({type}) => type.name);
    return types.join(' / ');
  }

}
