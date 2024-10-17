import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';

import { GameCardComponent } from './game-card/game-card.component';
import { GameServiceService } from './game-service.service';
@Component({
  selector: 'app-games',
  standalone: true,
  imports: [GameCardComponent, NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css',
})
export class GamesComponent implements OnInit {
  searchControl = new FormControl();
  results: any[] = [];
  games: any[] = [];
  constructor(private gameService: GameServiceService) {}
  ngOnInit() {
    this.gameService.getGames().subscribe((data: any[]) => {
      console.log(data);
      this.games = data;
    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // Wait for 300ms pause in events
        switchMap((query) => {
          if (query) {
            return this.gameService.search(query);
          } else {
            return []; // Return empty array if no query
          }
        })
      )
      .subscribe((data) => {
        this.games = data; // Assign results to the component's results property
      });
  }
}
