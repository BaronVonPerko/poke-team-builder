import {Component, inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ApiService} from './services/api.service';
import {debounceTime, filter, map, switchMap} from 'rxjs';
import {MemberCardComponent} from './components/member-card.component';
import {EmptyCardComponent} from './components/empty-card.component';
import {ShareComponent} from './components/share.component';
import {BasicPokemon, Pokemon} from '@poke-team-builder/models';
import {getIdFromUrl, getUrlFromId} from '@poke-team-builder/misc';


@Component({
    standalone: true,
    imports: [
        CommonModule,
        EmptyCardComponent,
        MatAutocompleteModule,
        MatButtonModule,
        MatInputModule,
        MatToolbarModule,
        MemberCardComponent,
        ReactiveFormsModule,
        ShareComponent,
    ],
    selector: 'poke-root',
    template: `
        <mat-toolbar color="primary">
            <span>Pokemon Team Builder</span>
        </mat-toolbar>

        <div class="container">
            <mat-form-field>
                <input matInput [formControl]="searchCtrl" [matAutocomplete]="auto" placeholder="Search...">
                <mat-autocomplete #auto="matAutocomplete" (optionSelected)="selectPokemon($event)">
                    <ng-container *ngIf="searchCtrl.value?.length">
                        <mat-option *ngFor="let option of options$ | async" [value]="option">
                            {{option.name | titlecase}}
                        </mat-option>
                    </ng-container>
                </mat-autocomplete>
            </mat-form-field>

            <div class="card-wrapper">
                <ng-container *ngFor="let pokemon of team">
                    <poke-member-card [pokemon]="pokemon" (remove)="onPokemonRemoved($event)"/>
                </ng-container>
                <ng-container *ngFor="let _ of emptySlots">
                    <poke-empty-card/>
                </ng-container>
            </div>

            <poke-share [team]="team"/>

            <a href="https://pokeapi.co/" target="_blank" class="footer">Powered by the PokeAPI!</a>
        </div>
    `,
    styles: [
        `
            .container {
                max-width: 800px;
                margin: 20px auto;
            }

            mat-form-field {
                width: 100%;
            }

            .card-wrapper {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: repeat(2, 1fr);
                grid-gap: 10px;
                height: 400px;
                margin: 10px;
            }

            @media (max-width: 900px) {
                .card-wrapper {
                    grid-template-columns: repeat(2, 1fr);
                }
            }

            @media (max-width: 600px) {
                .card-wrapper {
                    grid-template-columns: repeat(1, 1fr);
                }
            }

            a.footer {
                display: block;
                text-align: center;
                margin: 20px 0;
            }
        `,
    ],
})
export class AppComponent implements OnInit {
    api = inject(ApiService);
    searchCtrl = new FormControl();
    team: Pokemon[] = [];
    emptySlots = Array(6);

    ngOnInit() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('team')) {
            const ids = params.get('team')?.split(',');
            ids?.map(id => {
                this.addToTeam({id: parseInt(id), name: '', url: getUrlFromId(id)});
            });
        }
    }

    options$ = this.searchCtrl.valueChanges.pipe(
        debounceTime(250),
        filter((term: string) => term.length >= 3),
        switchMap((term: string) => this.api.search(term)),
        map((results: BasicPokemon[]) => {
            return results.filter((result) => {
                return !this.team.find(({id}) => id === getIdFromUrl(result.url))
            });
        }),
        map((results) => results.slice(0, 3)),
    );

    selectPokemon(selected: MatAutocompleteSelectedEvent) {
        this.addToTeam(selected.option.value);
        this.searchCtrl.setValue('');
    }

    private addToTeam({url}: BasicPokemon) {
        console.log(url);
        this.api.getDetails(url).subscribe((details) => {
            this.team.push(details);
            this.emptySlots = Array(6 - this.team.length);
        });
    }

    onPokemonRemoved(id: number) {
        this.team = this.team.filter(p => p.id !== id);
        this.emptySlots = Array(6 - this.team.length);
    }
}
