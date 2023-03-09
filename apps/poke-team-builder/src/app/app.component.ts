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
import {EmptyCardComponent} from './empty-card.component';

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
        EmptyCardComponent
    ],
    selector: 'poke-root',
    template: `
        <ng-container *ngIf="pokemon$ | async as pokemon">
            <mat-toolbar color="primary">
                <span>Poke Team Builder</span>
            </mat-toolbar>

            <mat-form-field>
                <input matInput [formControl]="searchCtrl" [matAutocomplete]="auto" placeholder="Search...">
                <mat-autocomplete #auto="matAutocomplete" (optionSelected)="addToTeam($event)">
                    <mat-option *ngFor="let option of options$ | async" [value]="option">
                        {{option.name | titlecase}}
                    </mat-option>
                </mat-autocomplete>
            </mat-form-field>

            <div class="card-wrapper">
                <ng-container *ngFor="let p of team">
                    <poke-member-card [pokemon]="p" (remove)="onPokemonRemoved($event)"/>
                </ng-container>
<!--                add an empty card for the remaining slots, up to a total of 6-->
                <ng-container *ngFor="let _ of empty">
                    <poke-empty-card/>
                </ng-container>
            </div>
        </ng-container>
    `,
    styles: [
        `mat-form-field {
            width: 100%;
        }

        .card-wrapper {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(2, 1fr);
            grid-gap: 10px;
        }
        `,
    ],
})
export class AppComponent {
    #api = inject(ApiService);
    pokemon$: Observable<Pokemon[]> = this.#api.getOriginalPokemon().pipe(tap((results) => (this.#pokemon = results)));
    #pokemon: Pokemon[] = [];
    searchCtrl = new FormControl();
    team: Pokemon[] = [{name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/'}];
    empty = Array(5);

    search = (term: string) =>
        this.#pokemon.filter((p) => p.name.includes(term.toLowerCase()));
    options$ = this.searchCtrl.valueChanges.pipe(
        debounceTime(250),
        filter((term) => term.length > 2),
        map(this.search),
        map(results => results.filter(p => this.team.indexOf(p) === -1)),
        map((results) => results.slice(0, 3))
    );

    addToTeam(selected: MatAutocompleteSelectedEvent) {
        this.team.push(selected.option.value);
        this.searchCtrl.setValue('');
        this.empty = Array(6 - this.team.length);
    }

    onPokemonRemoved(pokemon: PokeDetails) {
        this.team = this.team.filter(p => p.name !== pokemon.name);
        this.empty = Array(6 - this.team.length);
    }
}

