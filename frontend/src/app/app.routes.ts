import { Routes } from '@angular/router';
import { LivrosComponent } from './components/livros/livros.component';
import { LivroListaComponent } from './components/livros/livro-lista/livro-lista.component';
import { LivroCadastroComponent } from './components/livros/livro-cadastro/livro-cadastro.component';
import { LivroDetalhesComponent } from './components/livros/livro-detalhes/livro-detalhes.component';

export const routes: Routes = [
    { path: '', redirectTo: '/livros', pathMatch: 'full' },
    {
        path: 'livros',
        component: LivrosComponent,
        children: [
            { path: '', component: LivroListaComponent },
            { path: 'lista', component: LivroListaComponent },
            { path: 'cadastro', component: LivroCadastroComponent },
            { path: 'cadastro/:id', component: LivroCadastroComponent },
            { path: ':id', component: LivroDetalhesComponent }
        ]
    },
    { path: '**', redirectTo: '/livros' }
];