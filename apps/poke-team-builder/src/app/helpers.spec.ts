import {getIdFromUrl, getUrlFromId} from './helpers';

describe('helper functions', () => {
    describe('getIdFromUrl', () => {
        it('should return the id from the url', () => {
            expect(getIdFromUrl('https://pokeapi.co/api/v2/pokemon/25/')).toEqual(25);
        });
    });

    describe('getUrlFromId', () => {
        it('should return the url from the id', () => {
            expect(getUrlFromId('25')).toEqual('https://pokeapi.co/api/v2/pokemon/25/');
        });
    });
});
