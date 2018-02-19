import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  authed = true;

  @Input()
  isHome: boolean;

  @Output()
  logout = new EventEmitter();

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  log(e: Event): void {
    e.preventDefault();

    this.logout.emit();
  }

  ngOnInit() {
  }

}
