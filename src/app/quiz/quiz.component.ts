import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Question} from '../data.models';
import {QuizService} from '../quiz.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  canChangeQuestion: boolean = true;
  @Input()
  questions: Question[] | null = [];
  @Output() changeQuestionEvent: EventEmitter<number> = new EventEmitter();
  userAnswers: string[] = [];
  quizService = inject(QuizService);
  router = inject(Router);

  submit(): void {
    this.quizService.computeScore(this.questions ?? [], this.userAnswers);
    this.router.navigateByUrl("/result");
  }
  changeQuestion(event: boolean, index: number){
    this.canChangeQuestion = event;
    this.changeQuestionEvent.emit(index);
  }
}
