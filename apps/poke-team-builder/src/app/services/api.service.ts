import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, of, tap} from 'rxjs';
import {BasicPokemon, Pokemon} from '@poke-team-builder/models';

@Injectable({providedIn: 'root'})
export class ApiService {
    #http = inject(HttpClient);
    #pokemon: BasicPokemon[] = [];

    getOriginalPokemon = () => {
        if (this.#pokemon.length) {
            return of(this.#pokemon);
        }
        return this.#http
            .get<{ results: BasicPokemon[] }>(
                'https://pokeapi.co/api/v2/pokemon?limit=151'
            )
            .pipe(
                map(({results}) => results),
                tap((results) => (this.#pokemon = results))
            )
    };

    search(term: string) {
        return this.getOriginalPokemon().pipe(
            map((results) =>
                results.filter((p) => p.name.includes(term.toLowerCase()))
            ),
        );
    }

    getDetails(url: string) {
        return this.#http.get<Pokemon>(url);
    }

}