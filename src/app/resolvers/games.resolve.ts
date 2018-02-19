import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs/Observable';
import { Game } from '../game';


@Injectable()
export class GamesResolve implements Resolve<Game> {

  constructor(
    private data: DataService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.data.getGames();
  }
}
