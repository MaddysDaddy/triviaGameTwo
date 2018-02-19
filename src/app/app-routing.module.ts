import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './question/question.component';
import { GameComponent } from './game/game.component';
import { QuestionResolve } from './resolvers/question.resolve';
import { GamesResolve } from './resolvers/games.resolve';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    resolve: {
      games: GamesResolve
    }
  },
  {
    path: 'new_question',
    pathMatch: 'full',
    component: QuestionComponent
  },
  {
    path: 'lets_play',
    pathMatch: 'full',
    component: GameComponent,
    resolve: {
      questions: QuestionResolve
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
