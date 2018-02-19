import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Game } from '../game';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  games: Array<Game> = [];

  filter = '';

  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) { }

  getGames() {
    this.data.getGames()
      .subscribe(games => {
        this.games = games;
        console.log(this.games);
      });
  }

  searchGames(e: Event) {
    e.preventDefault();
    if (this.filter === '') {
      this.getGames();
    } else {
      this.data.searchGames(this.filter)
        .subscribe(games => {
          console.log(games);
          this.games = games;
        });
    }
  }


  ngOnInit() {
    this.games = this.route.snapshot.data.games;
  }

}
