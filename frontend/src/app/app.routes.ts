import { Routes } from '@angular/router';
import { LivroListaComponent } from './components/livros/livro-lista/livro-lista.component';
import { LivroCadastroComponent } from './components/livros/livro-cadastro/livro-cadastro.component';

export const routes: Routes = [
    { path: 'livros', component: LivroListaComponent },
    { path: 'livros/novo', component: LivroCadastroComponent },
    { path: '', redirectTo: '/livros', pathMatch: 'full' }
];
