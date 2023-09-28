import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Question} from '../data.models';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  @Input() canChangeQuestion?: boolean;
  @Input({required: true})
  question!: Question;
  @Input()
  correctAnswer?: string;
  @Input()
  userAnswer?: string;
  @Output() changeQuestionEvent: EventEmitter<boolean> = new EventEmitter();
  getButtonClass(answer: string): string {
    if (! this.userAnswer) {
        if (this.currentSelection == answer)
          return "tertiary";
    } else {
      if (this.userAnswer == this.correctAnswer && this.userAnswer == answer)
        return "tertiary";
      if (answer == this.correctAnswer)
        return "secondary";
    }
    return "primary";
  }

  @Output()
  change = new EventEmitter<string>();

  currentSelection!: string;

  buttonClicked(answer: string): void {
    this.currentSelection = answer;
    this.change.emit(answer);
  }
  changeQuestion(){
    this.changeQuestionEvent.emit(false);
  }
}
