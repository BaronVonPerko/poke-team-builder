import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'poke-share',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `<button mat-raised-button color="primary">
    <mat-icon>share</mat-icon>
    Share
  </button>`,
  styles: [`:host {display: block; margin: 40px 0 0; text-align: center;}`],
})
export class ShareComponent {}
