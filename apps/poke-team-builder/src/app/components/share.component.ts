import {Component, inject, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import Pokemon from '../models/pokemon';

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
    const ids = this.team.map(({id}) => id);
    const url = `http://localhost:4200?team=${ids.join(',')}`;
    navigator.clipboard.writeText(url);
    this.snackbar.open('Copied to clipboard!', 'Close', {duration: 2000});
  }
}
