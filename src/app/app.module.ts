import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { PlayersComponent } from './players/players.component';

import { CookieModule } from 'ngx-cookie';

import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { QuestionComponent } from './question/question.component';
import { GameComponent } from './game/game.component';

import { QuestionResolve } from './resolvers/question.resolve';
import { GamesResolve } from './resolvers/games.resolve';

import { SearchPipe } from './search.pipe';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    PlayersComponent,
    QuestionComponent,
    GameComponent,
    SearchPipe,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    CookieModule.forRoot()
  ],
  providers: [
    AuthService,
    DataService,
    QuestionResolve,
    GamesResolve,
    SearchPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
