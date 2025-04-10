import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <nav>
      <a routerLink="/livros" routerLinkActive="active">Lista de Livros</a>
      <a routerLink="/livros/novo" routerLinkActive="active">Cadastrar Livro</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    nav a {
      margin-right: 15px;
    }
    .active {
      font-weight: bold;
    }
  `]
})
export class AppComponent { }
