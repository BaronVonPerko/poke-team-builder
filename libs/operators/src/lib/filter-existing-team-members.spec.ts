import Pokemon from '../../../../apps/poke-team-builder/src/app/models/pokemon';
import BasicPokemon from '../../../../apps/poke-team-builder/src/app/models/basicPokemon';
import {lastValueFrom, of} from 'rxjs';
import {filterExistingTeamMembers} from '@poke-team-builder/operators';

describe('filterExistingTeamMembers', () => {
    it('should filter out existing team members', async () => {
        const team = [
            {id: 25, name: 'pikachu'} as Pokemon,
            {id: 4, name: 'charmander'} as Pokemon,
        ];
        const apiSearchResults = [
            {name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/'} as BasicPokemon,
            {name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/'} as BasicPokemon,
        ];
        const expected = [{name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/'} as BasicPokemon];

        const obs = of(apiSearchResults).pipe(filterExistingTeamMembers(team));
        await expect(lastValueFrom(obs)).resolves.toEqual(expected);
    });
});