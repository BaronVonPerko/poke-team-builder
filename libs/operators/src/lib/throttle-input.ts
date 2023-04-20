import {debounceTime, filter, Observable} from 'rxjs';

export function throttleInput({time, minLength} = {time: 250, minLength: 3}) {
    return function(source: Observable<any>) {
        return source.pipe(
            debounceTime(time),
            filter((term: string) => term.length >= minLength),
        )
    }
}