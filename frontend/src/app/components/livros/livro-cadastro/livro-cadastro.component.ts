import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Livro } from '../../../models/livro.model';
import { LivroService } from '../../../services/livro.service';

@Component({
    selector: 'app-livro-cadastro',
    standalone: true,
    templateUrl: './livro-cadastro.component.html',
    styleUrls: ['./livro-cadastro.component.css'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ]
})
export class LivroCadastroComponent implements OnInit {
    livroCadastro!: FormGroup; // Alterado para livroCadastro
    isEdicao = false;
    livroId?: number;
    submitting = false;
    erro: string | null = null;

    constructor(
        private fb: FormBuilder,
        private livroService: LivroService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.inicializarFormulario();

        this.route.params.subscribe(params => {
            if (params['id']) {
                this.livroId = +params['id'];
                this.isEdicao = true;
                this.carregarLivro(this.livroId);
            }
        });
    }

    inicializarFormulario(): void {
        this.livroCadastro = this.fb.group({ // Alterado para livroCadastro
            titulo: ['', [Validators.required]],
            autor: ['', [Validators.required]],
            sinopse: ['', [Validators.required]],
            anoPublicacao: ['', [
                Validators.required,
                Validators.min(1000),
                Validators.max(new Date().getFullYear())
            ]],
            ativo: [true]
        });
    }

    carregarLivro(id: number): void {
        this.livroService.getLivroPorId(id).subscribe({
            next: (livro) => {
                this.livroCadastro.patchValue(livro); // Alterado para livroCadastro
            },
            error: (e) => {
                this.erro = 'Erro ao carregar livro: ' + e.message;
            }
        });
    }

    onSubmit(): void {
        if (this.livroCadastro.invalid) { // Alterado para livroCadastro
            this.livroCadastro.markAllAsTouched(); // Alterado para livroCadastro
            return;
        }

        this.submitting = true;
        const livro: Livro = this.livroCadastro.value; // Alterado para livroCadastro

        if (this.isEdicao && this.livroId) {
            this.livroService.atualizarLivro(this.livroId, livro).subscribe({
                next: () => {
                    this.router.navigate(['/livros']);
                },
                error: (e) => {
                    this.erro = 'Erro ao atualizar livro: ' + e.message;
                    this.submitting = false;
                }
            });
        } else {
            this.livroService.criarLivro(livro).subscribe({
                next: () => {
                    this.router.navigate(['/livros']);
                },
                error: (e) => {
                    this.erro = 'Erro ao criar livro: ' + e.message;
                    this.submitting = false;
                }
            });
        }
    }

    campoInvalido(campo: string): boolean {
        const control = this.livroCadastro.get(campo); // Alterado para livroCadastro
        return !!(control && control.invalid && (control.dirty || control.touched));
    }
}