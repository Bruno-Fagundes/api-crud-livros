import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LivroService } from '../../../services/livro.service';
import { Livro } from '../../../entities/livro.entity';

@Component({
    selector: 'app-livro-lista',
    templateUrl: './livro-lista.component.html',
    styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {
    livros: Livro[] = [];
    erro: string | null = null;

    constructor(
        private livroService: LivroService,
        private router: Router) { }

    ngOnInit(): void {
        this.carregarLivros();
    }

    carregarLivros(): void {
        this.livroService.listLivros().subscribe({
            next: (livros) => this.livros = livros,
            error: (e) => this.erro = 'Erro ao carregar livros'
        });
    }

    desativarLivro(id: number): void {
        if (confirm('Tem certeza?')) {
            this.livroService.desativarLivro(id).subscribe({
                next: () => this.carregarLivros(),
                error: (e) => this.erro = 'Erro ao desativar'
            });
        }
    }

    editarLivro(id: number): void {
        this.router.navigate(['/livros/editar', id]);
    }
}
