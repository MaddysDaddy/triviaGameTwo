import { Injectable } from '@angular/core';
import { User } from '../user';
import { Http } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  base = '/auth/users';

  currentUser: User;

  constructor(
    private http: Http,
    private cookie: CookieService
  ) { }

  login(user): Promise<User> {
    return this.http.post(`${this.base}/login`, user)
      .map(response => response.json())
      .toPromise();
  }

  logout(): Promise<User> {
    return this.http
      .delete(`${this.base}/logout`)
      .map(response => response.json())
      .toPromise();
  }

  getUser() {
    return this.http.get(`${this.base}/user`)
      .map(response => response.json());
  }

  getUsers() {
    return this.http.get(`${this.base}`)
      .map(response => response.json());
  }


  isAuthed(): boolean {
    const expired = parseInt(this.cookie.get('expiration'), 10);
    const userID = this.cookie.get('userID');
    const session = this.cookie.get('session');

    return Boolean(session && expired && userID && expired > Date.now());
  }
}
