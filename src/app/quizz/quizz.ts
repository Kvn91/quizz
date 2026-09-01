import { Component, inject, signal } from '@angular/core';
import { quizzService } from '../services/quizzService';
import { QuestionForm } from '../models/quizz';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-quizz',
  imports: [ReactiveFormsModule],
  templateUrl: './quizz.html',
  styleUrl: './quizz.css',
})
export class Quizz {
  private quizzService = inject(quizzService);
  questionsList = this.quizzService.questionsList;
  currentQuestion = signal({} as QuestionForm);
  isBegan = signal(false);
  isFinished = signal(false);
  score = signal<boolean[]>([]);

  private formBuilder = inject(FormBuilder);
  quizzForm = this.formBuilder.group({
    answers: this.formBuilder.array([]),
  });

  get answers() {
    return this.quizzForm.get('answers') as FormArray;
  }

  ngOnInit() {
    this.currentQuestion.set({ index: 0, question: this.questionsList()[0] });
    for (let i = 0; i < this.questionsList().length; i++) {
      this.answers.push(this.formBuilder.control(''));
    }
  }

  onStartQuizz() {
    this.isBegan.set(true);
  }

  onClickOption(chosenAnswer: string, event: PointerEvent) {
    event.preventDefault();

    let answersList = [...this.answers.value];
    answersList[this.currentQuestion().index] = chosenAnswer;
    this.answers.setValue(answersList);
  }

  onAnswer() {
    const answer = this.answers.value[this.currentQuestion().index];
    if (answer !== '') {
      this.score.update((prevScore) => {
        prevScore.splice(
          this.currentQuestion().index,
          0,
          answer === this.currentQuestion().question.answer,
        );
        return prevScore;
      });
      if (this.currentQuestion().index + 1 === this.questionsList().length) {
        this.isFinished.set(true);
      } else {
        this.currentQuestion.update((prevQuestion) => {
          return {
            index: prevQuestion.index + 1,
            question: this.questionsList()[prevQuestion.index + 1],
          };
        });
      }
    }
  }

  pointsCounterClasses(index: number): string {
    if (index === this.currentQuestion().index) {
      return ' current';
    } else if (this.score()[index] !== undefined) {
      return this.score()[index] ? ' green' : ' red';
    }

    return '';
  }
}
