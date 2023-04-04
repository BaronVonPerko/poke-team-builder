import {Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import Pokemon from './models/pokemon';

@Component({
  selector: 'poke-share',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `<button mat-raised-button color="primary" (click)="share()">
    <mat-icon>share</mat-icon>
    Share
  </button>`,
  styles: [`:host {display: block; margin: 40px 0 0; text-align: center;}`],
})
export class ShareComponent {
  @Input() team: Pokemon[] = [];

  share() {
    const ids = this.team.map(pokemon => pokemon.url.split('/')[6]);
    const url = `http://localhost:4200?team=${ids.join(',')}`;
    navigator.clipboard.writeText(url);
  }
}
