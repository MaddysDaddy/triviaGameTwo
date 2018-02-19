import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { Game } from '../game';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  questions: Array<Question>[];

  game = new Game();

  user: User;

  errorMessage: string;

  q1: number;
  q2: number;
  q3: number;

  constructor(
    private auth: AuthService,
    private data: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  getQuestions() {
    this.data.getQuestions()
      .subscribe(questions => {
        this.questions = questions;
        console.log(this.questions);
      });
  }

  onSubmit(e: Event) {

    let score = 0;

    // Additional safety catch to ensure all fields are answered.
    if (!this.q1 || !this.q2 || !this.q3) {
      e.preventDefault();
      this.errorMessage = 'Please answer all questions.';
    } else {

      if (this.q1 === this.questions[0]['correct_answer']) {
        score += 1;
      }
      if (this.q2 === this.questions[1]['correct_answer']) {
        score += 1;
      }
      if (this.q3 === this.questions[2]['correct_answer']) {
        score += 1;
      }

      console.log(this.user.name);

      this.game.percentage = Math.round((score / 3) * 100).toString();
      this.game.score = score.toString();
      this.game.user = this.user.name;

      console.log('Current Game: ', this.game);

      this.data.saveGame(this.game)
        .subscribe(savedGame => {
          console.log('Saved game: ', savedGame);
          this.errorMessage = null;

          if (this.game.score === '3') {
            this.data.message = `That was great! You scored ${this.game.score}/3 (${this.game.percentage}%)`;
          } else if (this.game.score === '2') {
            this.data.message = `Almost perfect. You scored ${this.game.score}/3 (${this.game.percentage}%)`;
          } else if (this.game.score === '1') {
            this.data.message = `Back to school fool! You scored ${this.game.score}/3 (${this.game.percentage}%)`;
          }

          this.router.navigate(['/']);
        });
    }
  }

  cancelGame() {
    this.data.errorMessage = 'Game canceled... way to chicken out!';

    this.game = new Game();

    this.router.navigate(['/']);
  }

  getUser() {
    this.auth.getUser()
      .subscribe(user => {
        this.user = user;
        console.log(this.user);
      });
  }

  ngOnInit() {
    this.questions = this.route.snapshot.data.questions;
    this.getUser();
  }

}
