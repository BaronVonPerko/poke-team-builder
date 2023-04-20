import {debounceTime, filter, pipe} from 'rxjs';

export function throttleInput({time, minLength} = {time: 250, minLength: 3}) {
    return pipe(
        debounceTime<string>(time),
        filter((term: string) => term.length >= minLength),
    );
}
