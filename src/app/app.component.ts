import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { GamesComponent } from './games/games.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GamesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'games';
}
