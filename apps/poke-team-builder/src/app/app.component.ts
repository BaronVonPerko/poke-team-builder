import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    MatButtonModule
  ],
  selector: 'poke-root',
  template: `<button mat-raised-button color="primary">Hello World</button>`,
  styles: [],
})
export class AppComponent {
}
