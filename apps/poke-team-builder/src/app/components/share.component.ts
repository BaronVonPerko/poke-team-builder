import {Component, inject, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import Pokemon from '../models/pokemon';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'poke-share',
  standalone: true,
  imports: [MatButtonModule, MatSnackBarModule, MatIconModule],
  template: `<button mat-raised-button color="primary" (click)="share()">
    <mat-icon>share</mat-icon>
    Share
  </button>`,
  styles: [`:host {display: block; margin: 40px 0 0; text-align: center;}`],
})
export class ShareComponent {
  @Input() team: Pokemon[] = [];

  snackbar = inject(MatSnackBar);

  share() {
    const ids = this.team.map(pokemon => pokemon.url.split('/')[6]);
    const url = `http://localhost:4200?team=${ids.join(',')}`;
    navigator.clipboard.writeText(url);
    this.snackbar.open('Copied to clipboard!', 'Close', {duration: 2000});
  }
}
