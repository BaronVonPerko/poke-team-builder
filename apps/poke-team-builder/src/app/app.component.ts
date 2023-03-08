import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ApiService} from './services/api.service';
import {debounceTime, filter, map, Observable, tap} from 'rxjs';
import Pokemon from './models/pokemon';
import {MemberCardComponent} from './member-card.component';
import PokeDetails from './models/poke-details';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatToolbarModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MemberCardComponent,
    ],
    selector: 'poke-root',
    template: `
        <ng-container *ngIf="pokemon$ | async as pokemon">
            <mat-toolbar color="primary">
                <span>Poke Team Builder</span>
            </mat-toolbar>


            <mat-autocomplete #auto="matAutocomplete" (optionSelected)="addToTeam($event)">
                <mat-option *ngFor="let option of options$ | async" [value]="option">
                    {{option.name | titlecase}}
                </mat-option>
            </mat-autocomplete>
            <mat-form-field>
                <input matInput [formControl]="searchCtrl" [matAutocomplete]="auto" placeholder="Search...">
            </mat-form-field>
            
            <div *ngFor="let p of team">
                <poke-member-card [pokemon]="p" (remove)="onPokemonRemoved($event)" />
            </div>
        </ng-container>
    `,
    styles: [],
})
export class AppComponent {
    #api = inject(ApiService);
    pokemon$: Observable<Pokemon[]> = this.#api.getOriginalPokemon().pipe(tap((results) => (this.#pokemon = results)));
    #pokemon: Pokemon[] = [];
    searchCtrl = new FormControl();
    team: Pokemon[] = [{name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/"}];
    search = (term: string) =>
        this.#pokemon.filter((p) => p.name.includes(term.toLowerCase()));
    options$ = this.searchCtrl.valueChanges.pipe(
        debounceTime(250),
        filter((term) => term.length > 3),
        map(this.search),
        map(results => results.filter(p => this.team.indexOf(p) === -1)),
        map((results) => results.slice(0, 3))
    );

    addToTeam(selected: MatAutocompleteSelectedEvent) {
        this.team.push(selected.option.value);
        this.searchCtrl.setValue('');
    }

    onPokemonRemoved(pokemon: PokeDetails) {
        this.team = this.team.filter(p => p.name !== pokemon.name);
    }
}

