import {lastValueFrom, of} from 'rxjs';
import {limitResults} from './limit-results';

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