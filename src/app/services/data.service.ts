import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Question } from '../question';
import { Game } from '../game';
import { User } from '../user';


import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  base = '/api';

  user: string;

  message: string;

  errorMessage: string;

  constructor(private http: Http) { }

  createQuestion(question: Question): Observable<Question> {
    return this.http.post(`${this.base}/questions/create`, question)
      .map(response => response.json());
  }

  getQuestions() {
    return this.http.get(`${this.base}/questions`)
      .map(response => response.json());
  }

  saveGame(game) {
    return this.http.post(`${this.base}/games/create`, game)
      .map(response => response.json());
  }

  getGames() {
    return this.http.get(`${this.base}/games`)
      .map(response => response.json());
  }

  searchGames(filter) {
    return this.http.get(`${this.base}/games/find?filter=${filter}`)
      .map(response => response.json());
  }

}
