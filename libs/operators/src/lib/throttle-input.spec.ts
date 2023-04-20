import {lastValueFrom, of} from 'rxjs';
import {TestScheduler} from 'rxjs/internal/testing/TestScheduler';
import {throttleInput} from '@poke-team-builder/operators';

describe('throttleInput', () => {
    let scheduler: TestScheduler;

    beforeEach(() => {
        scheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    it('should ignore debounce if time is set to 0 input', () => {
        scheduler.run(({cold, expectObservable}) => {
            const source = cold('--a--b--c', {a: 'char', b: 'charm', c: 'charma'});
            const expected = '--a--b--c';

            const result = source.pipe(throttleInput({time: 0, minLength: 0}));

            expectObservable(result).toBe(expected, {a: 'char', b: 'charm', c: 'charma'});
        });
    });

    it('should debounce the input', () => {
        scheduler.run(({cold, expectObservable}) => {
            const source = cold('ab--c-----d', {a: 'char', b: 'charm', c: 'charma', d: 'charman'});
            const expected = '-------c-----d';

            const result = source.pipe(throttleInput({time: 3, minLength: 0}));

            expectObservable(result).toBe(expected, {c: 'charma', d: 'charman'});
        });
    });

    it('should limit the input to 3', async () => {
        const obs1 = of('cha').pipe(throttleInput({time: 0, minLength: 3}));
        await expect(lastValueFrom(obs1)).resolves.toBe('cha');

        const obs2 = of('c').pipe(throttleInput({time: 0, minLength: 3}));
        await expect(lastValueFrom(obs2)).rejects.toThrow();
    });
});