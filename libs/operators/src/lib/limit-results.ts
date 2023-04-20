import {map} from 'rxjs';

export function limitResults(numResults = 3) {
    return map((results: any[]) => results.slice(0, numResults));
}
