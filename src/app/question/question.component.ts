import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Question } from '../question';
import { NgForm } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  isHome: boolean = false;

  question = new Question();

  constructor(
    private auth: AuthService,
    private data: DataService,
    private router: Router
  ) { }

  onSubmit(e: Event, form: NgForm) {
    e.preventDefault();
    this.data.createQuestion(form.value)
      .subscribe(newQuestion => {
        console.log('Question saved.');

        this.data.message = 'Question saved successfully!';

        this.question = new Question();

        form.resetForm();

        this.router.navigate(['/']);
      });
  }

  cancelQuestion(form: NgForm) {
    this.data.errorMessage = 'Question not saved!';

    this.question = new Question();

    form.resetForm();

    this.router.navigate(['/']);
  }

  logout(): void {
    this.auth.logout()
      .then(() => {
        this.router.navigate(['/']);
        console.log('logging out...');
      })
      .catch(error => {
        console.log('Error occured logging out', error);
      });
  }

  ngOnInit() {
  }

}
