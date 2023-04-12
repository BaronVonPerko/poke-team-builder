import {filterExistingTeamMembers, limitResults, throttleInput} from './operators';
import {lastValueFrom, of} from 'rxjs';
import Pokemon from './models/pokemon';
import {TestScheduler} from 'rxjs/internal/testing/TestScheduler';

describe('operators', () => {

    describe('filterExistingTeamMembers', () => {
        it('should filter out existing team members', async () => {
            const team: Pokemon[] = [
                {name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/'},
                {name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/'}
            ];
            const apiSearchResults: Pokemon[] = [
                {name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/'},
                {name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/'}
            ];
            const expected = [{name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/'}];

            const obs = of(apiSearchResults).pipe(filterExistingTeamMembers(team));
            await expect(lastValueFrom(obs)).resolves.toEqual(expected);
        });
    });

    describe('limitResults', () => {
        it('should limit the results to 3 by default', async () => {
            const obs = of([1, 2, 3, 4, 5]).pipe(limitResults());
            await expect(lastValueFrom(obs)).resolves.toEqual([1, 2, 3]);
        });

        it('should limit the results to the parameter given', async () => {
            const obs = of([1, 2, 3, 4, 5]).pipe(limitResults(2));
            await expect(lastValueFrom(obs)).resolves.toEqual([1, 2]);
        });
    });

    describe('throttleInput', () => {
        let scheduler: TestScheduler;

        beforeEach(() => {
            scheduler = new TestScheduler((actual, expected) => {
                expect(actual).toEqual(expected);
            });
        });

        it('should ignore debounce if time is set to 0 input', () => {
            scheduler.run(({ cold, expectObservable }) => {
                const source = cold('--a--b--c', { a: 'char', b: 'charm', c: 'charma' });
                const expected = '--a--b--c';

                const result = source.pipe(throttleInput({ time: 0, minLength: 0 }));

                expectObservable(result).toBe(expected, { a: 'char', b: 'charm', c: 'charma' });
            });
        });

        it('should debounce the input', () => {
            scheduler.run(({ cold, expectObservable }) => {
                const source = cold('ab--c-----d', { a: 'char', b: 'charm', c: 'charma', d: 'charman' });
                const expected = '-------c-----d';

                const result = source.pipe(throttleInput({ time: 3, minLength: 0 }));

                expectObservable(result).toBe(expected, { c: 'charma', d: 'charman' });
            });
        });

        it('should limit the input to 3 and debounce 250ms by default', async () => {
            const obs1 = of('abc').pipe(throttleInput());
            await expect(lastValueFrom(obs1)).resolves.toBe('abc');

            const obs2 = of('a').pipe(throttleInput());
            await expect(lastValueFrom(obs2)).rejects.toThrow();

            // todo: write tests that prove debounceTime is working
        });
    });
});
