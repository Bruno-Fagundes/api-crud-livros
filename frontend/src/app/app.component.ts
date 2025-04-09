import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LivrosComponent } from './components/livros/livros.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LivrosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
