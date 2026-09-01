import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Quizz } from './quizz/quizz';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Quizz],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('quizz');
}
