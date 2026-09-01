import { Injectable, signal } from '@angular/core';
import questions from '../../data/questions.json';
import { QuestionsList } from '../models/quizz';

@Injectable({ providedIn: 'root' })
export class quizzService {
  questionsList = signal<QuestionsList>(questions).asReadonly();
}
