import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import Pokemon from '../models/pokemon';
import {TypesPipe} from '../pipes/types.pipe';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
    selector: 'poke-member-card',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatIconModule, TypesPipe, MatButtonModule],
    template: `
        <mat-card *ngIf="pokemon">
            <mat-card-header>
                <mat-card-title>
                        <span class="grey">{{pokemon.id}}</span>
                        <span>{{pokemon.name | titlecase}}</span>
                </mat-card-title>
            </mat-card-header>
            <mat-card-content>
                <img [src]="pokemon.sprites.front_default" [alt]="pokemon.name"/>
                <p class="grey">{{pokemon | types | uppercase}}</p>
            </mat-card-content>
            <mat-card-actions>
                <button mat-icon-button color="accent" (click)="remove.emit(pokemon.id)">
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
                width: 60%;
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
    @Input() pokemon!: Pokemon;
    @Output() remove = new EventEmitter<number>();
}
