import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Pokemon from '../models/pokemon';
import {map, of, tap} from 'rxjs';
import PokeDetails from '../models/poke-details';

@Injectable({providedIn: 'root'})
export class ApiService {
    #http = inject(HttpClient);
    #pokemon: Pokemon[] = [];

    getOriginalPokemon = () => {
        if (this.#pokemon.length) {
            return of(this.#pokemon);
        }
        return this.#http
            .get<{ results: Pokemon[] }>(
                'https://pokeapi.co/api/v2/pokemon?limit=151'
            )
            .pipe(
                map(({results}) => results),
                tap((results) => (this.#pokemon = results))
            )
    };

    getDetails(url: string) {
        return this.#http.get<PokeDetails>(url);
    }

}