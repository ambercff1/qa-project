import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Orchestrator } from './components/orchestrator/orchestrator';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Orchestrator],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('qa-project-frontend');
}
