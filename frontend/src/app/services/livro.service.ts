// src/app/services/livro.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../entities/livro.entity';

@Injectable({
  providedIn: 'root' // ← Isso é crucial!
})
export class LivroService {
  private apiUrl = 'http://localhost:8080/livros';

  constructor(private http: HttpClient) { }

  listLivros(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.apiUrl);
  }

  getLivroId(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.apiUrl}/${id}`);
  }

  desativarLivro(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/desativar`, {});
  }

  criarLivro(livro: Omit<Livro, 'id'>): Observable<Livro> {
    return this.http.post<Livro>(this.apiUrl, livro);
  }

  atualizarLivro(id: number, livro: Partial<Livro>): Observable<Livro> {
    return this.http.put<Livro>(`${this.apiUrl}/${id}`, livro);
  }
}