import Pokemon from '../../../../apps/poke-team-builder/src/app/models/pokemon';
import {map} from 'rxjs';
import BasicPokemon from '../../../../apps/poke-team-builder/src/app/models/basicPokemon';
import {getIdFromUrl} from '../../../../apps/poke-team-builder/src/app/helpers';

export function filterExistingTeamMembers(team: Pokemon[]) {
    return map((results: BasicPokemon[]) => {
        return results.filter((result) => !team.find(({id}) => id === getIdFromUrl(result.url)));
    });
}