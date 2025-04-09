import { Component, OnInit } from '@angular/core';
import { Livro } from '../../../models/livro.model';
import { LivroService } from '../../../services/livro.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-livro-lista',
    templateUrl: './livro-lista.component.html',
    styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {
    livros: Livro[] = [];
    carregando = true;
    erro: string | null = null;

    constructor(
        private livroService: LivroService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.carregarLivros();
    }

    carregarLivros(): void {
        this.carregando = true;
        this.livroService.getLivros()
            .subscribe({
                next: (data) => {
                    this.livros = data;
                    this.carregando = false;
                },
                error: (e) => {
                    this.erro = 'Erro ao carregar livros: ' + e.message;
                    this.carregando = false;
                }
            });
    }

    verDetalhes(id: number): void {
        this.router.navigate(['/livros', id]);
    }

    editarLivro(id: number): void {
        this.router.navigate(['/livros/editar', id]);
    }

    deletarLivro(id: number): void {
        if (confirm('Tem certeza que deseja desativar este livro?')) {
            this.livroService.desativarLivro(id)
                .subscribe({
                    next: () => {
                        this.carregarLivros();
                    },
                    error: (e) => {
                        this.erro = 'Erro ao desativar livro: ' + e.message;
                    }
                });
        }
    }
}
