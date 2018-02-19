import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();

  authed: boolean;

  message: string;

  errorMessage: string;

  isHome: boolean = true;

  constructor(
    private auth: AuthService,
    private data: DataService,
    private router: Router
  ) { }

  onSubmit(e: Event, user: User) {
    this.auth.login(user)
      .then(loggedUser => {
        this.authed = true;

        // form.resetForm();
      })
      .catch(error => {
        console.log('login error: ', error);
      });
  }

  logout(): void {
    this.auth.logout()
      .then(() => {
        this.router.navigate(['/']);
        console.log('logging out...');
        this.user = new User();
        this.message = '';
        this.authed = false;
      })
      .catch(error => {
        console.log('Error occured logging out', error);
      });
  }

  ngOnInit() {
    this.authed = this.auth.isAuthed();
    this.message = this.data.message;
    this.errorMessage = this.data.errorMessage;

    setTimeout(() => {
      this.message = '';
      this.errorMessage = '';
      this.data.errorMessage = '';
      this.data.message = '';
    }, 3000);
  }

}
