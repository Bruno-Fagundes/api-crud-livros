import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../../../models/livro.model';
import { LivroService } from '../../../services/livro.service';

@Component({
    selector: 'app-livro-detalhes',
    templateUrl: './livro-detalhes.component.html',
    styleUrls: ['./livro-detalhes.component.css']
})
export class LivroDetalhesComponent implements OnInit {
    livro: Livro | null = null;
    carregando = true;
    erro: string | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private livroService: LivroService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.carregarLivro(+id);
        } else {
            this.erro = 'ID do livro não fornecido';
            this.carregando = false;
        }
    }

    carregarLivro(id: number): void {
        this.livroService.getLivroPorId(id)
            .subscribe({
                next: (data) => {
                    this.livro = data;
                    this.carregando = false;
                },
                error: (e) => {
                    this.erro = 'Erro ao carregar detalhes do livro: ' + e.message;
                    this.carregando = false;
                }
            });
    }

    editarLivro(): void {
        if (this.livro) {
            this.router.navigate(['/livros/cadastro', this.livro.id]);
        }
    }

    voltarParaLista(): void {
        this.router.navigate(['/livros']);
    }

    desativarLivro(): void {
        if (this.livro && this.livro.id && confirm('Tem certeza que deseja desativar este livro?')) {
            this.livroService.desativarLivro(this.livro.id)
                .subscribe({
                    next: () => {
                        this.router.navigate(['/livros']);
                    },
                    error: (e) => {
                        this.erro = 'Erro ao desativar livro: ' + e.message;
                    }
                });
        }
    }
}