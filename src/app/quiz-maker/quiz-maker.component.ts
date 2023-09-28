import {Component, OnInit} from '@angular/core';
import {Category, Difficulty, Question} from '../data.models';
import {Observable} from 'rxjs';
import {QuizService} from '../quiz.service';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css']
})
export class QuizMakerComponent implements OnInit {
  categories$: Observable<Category[]>;
  categories: Category[] = [];
  subCategories: string[] = [];
  questions$!: Observable<Question[]>;
  hasSubCategory: boolean = false;
  selectedCategoryId: any;
  constructor(protected quizService: QuizService) {
    this.categories$ = quizService.getAllCategories()
  }
  ngOnInit(){
    this.categories$.subscribe(categories => this.categories = categories)
  }

  createQuiz(difficulty: string): void {
    this.questions$ = this.quizService.createQuiz(this.selectedCategoryId, difficulty as Difficulty);
  }
  onOptionSelected(option: string){
    const selectedOption = this.categories.find(category => category.name == option);
    this.selectedCategoryId = selectedOption?.id;
    this.hasSubCategory = selectedOption?.name.includes(":") ? true : false;
    if(this.hasSubCategory){
      const mainCategoryName = selectedOption?.name.split(":")[0].trim();
      if(mainCategoryName){
        this.subCategories = this.categories
        .filter(category => category.name.includes(mainCategoryName))
        .map(category => category.name.replace(/\S+:/, "").trim());
      }
    }
  }
  getCategoriesName(): string[]{
    return this.categories.map(category => category.name);
  }
}
