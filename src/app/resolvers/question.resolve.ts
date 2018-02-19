import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs/Observable';
import { Question } from '../question';


@Injectable()
export class QuestionResolve implements Resolve<Question> {

  constructor(
    private dataService: DataService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.dataService.getQuestions();
  }
}
