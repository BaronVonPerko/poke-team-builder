import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import Pokemon from './models/pokemon';
import {MatCardModule} from '@angular/material/card';
import {ApiService} from './services/api.service';
import {Observable} from 'rxjs';
import PokeDetails from './models/poke-details';
import {TypesPipe} from './pipes/types.pipe';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
    selector: 'poke-member-card',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatIconModule, TypesPipe, MatButtonModule],
    template: `
        <mat-card *ngIf="details$ | async; let details">
            <mat-card-header>
                <mat-card-title>
                        <span class="grey">{{details.id}}</span>
                        <span>{{details.name | titlecase}}</span>
                </mat-card-title>
            </mat-card-header>
            <mat-card-content>
                <img [src]="details.sprites.front_default" [alt]="details.name"/>
                <p class="grey">{{details | types | uppercase}}</p>
            </mat-card-content>
            <mat-card-actions>
                <button mat-icon-button color="accent" (click)="remove.emit(details)">
                    <mat-icon>delete</mat-icon>
                </button>
            </mat-card-actions>
        </mat-card>`,
    styles: [
        `
            mat-card-title span:first-child {
                margin-right: 10px;
            }
            mat-card-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            mat-card-content img {
                width: 80%;
            }
            .grey {
                color: #aaa
            }
            mat-card-actions {
                display: flex;
                justify-content: flex-end;
            }
        `

    ],
})
export class MemberCardComponent {
    #api = inject(ApiService);
    @Input() set pokemon(pokemon: Pokemon) {
        this.details$ = this.#api.getDetails(pokemon.url);
    }
    @Output() remove = new EventEmitter<PokeDetails>();
    details$: Observable<PokeDetails> |null = null;
}
