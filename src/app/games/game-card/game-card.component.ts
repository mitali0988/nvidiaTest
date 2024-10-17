import { Component, EventEmitter, Input, Output } from '@angular/core';

interface GameCard {
  id: number;
  descriptionShort: string;
  title: string;
  photoUrl: string;
}
@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css',
})
export class GameCardComponent {
  @Input() cardData!: GameCard;
  ngOnInit() {
    console.log(this.cardData);
  }
  onClick(event: Event, id: number): void {
    //get favourite game data from local storage
    const favouriteCards = this.getFavoriteGames();
    // check if localstorage key is exist or not. if does not exist create localstorage key with value.
    if (favouriteCards.length > 0) {
      // if key already exists, check if card is already added or not. if not added, add it. if added, remove it.
      if (!this.isFavouriteGame(id)) {
        favouriteCards.push(id);
        localStorage.setItem('favouriteCards2', JSON.stringify(favouriteCards));
      } else {
        let modifiedCardArray = favouriteCards.filter((item) => {
          return item !== id;
        });
        localStorage.setItem(
          'favouriteCards2',
          JSON.stringify(modifiedCardArray)
        );
      }
    } else {
      localStorage.setItem('favouriteCards2', JSON.stringify([id]));
    }
  }

  // get favorite item data from local storage
  getFavoriteGames(): number[] {
    const favouriteCards = localStorage.getItem('favouriteCards2');
    return favouriteCards ? JSON.parse(favouriteCards) : [];
  }

  // check if a particular game is added in favourite or not
  isFavouriteGame(id: number) {
    const favouriteCards = this.getFavoriteGames();
    const card = favouriteCards.find((item) => {
      return item == id;
    });
    return card ? true : false;
  }
}
