package br.edu.fema.api_crud_livros.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.edu.fema.api_crud_livros.entity.Livro;

@Repository
public interface LivroRepository extends JpaRepository<Livro, Long> {
}
