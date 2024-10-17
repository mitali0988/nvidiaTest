import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GameServiceService {
  constructor(private http: HttpClient) {}
  apiUrl = 'https://api.tesera.ru/';
  getGames(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/games`);
  }
  search(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search/games?query=${query}`);
  }
}
