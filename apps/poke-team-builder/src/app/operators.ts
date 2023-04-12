import Pokemon from './models/pokemon';
import {debounceTime, filter, map, Observable} from 'rxjs';

export function throttleInput({time, minLength} = {time: 250, minLength: 3}) {
    return function(source: Observable<any>) {
        return source.pipe(
            debounceTime(time),
            filter((term: string) => term.length >= minLength),
        )
    }
}

export function filterExistingTeamMembers(team: Pokemon[]) {
    return map((results: Pokemon[]) => {
        return results.filter((result) => !team.find((member) => member.url === result.url));
    });
}

export function limitResults(numResults = 3) {
    return map((results: any[]) => results.slice(0, numResults));
}