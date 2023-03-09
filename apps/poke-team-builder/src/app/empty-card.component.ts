import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'poke-empty-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
  <mat-card>
    <mat-card-content>
        <p>Empty Slot</p>
    </mat-card-content>
  </mat-card>
  `,
  styles: [
      `
          mat-card {
              background-color: #eee;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #aaa;
          }
      `
  ],
})
export class EmptyCardComponent {}
