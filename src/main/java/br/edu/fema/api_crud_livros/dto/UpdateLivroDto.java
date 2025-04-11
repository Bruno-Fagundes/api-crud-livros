package br.edu.fema.api_crud_livros.dto;

public record UpdateLivroDto(String titulo, String autor, String sinopse, Integer anoPublicacao) {
}
