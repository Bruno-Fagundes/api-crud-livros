package br.edu.fema.api_crud_livros.service;

import java.util.List;
import java.util.Optional;

import br.edu.fema.api_crud_livros.dto.CreateLivroDto;
import br.edu.fema.api_crud_livros.dto.UpdateLivroDto;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.fema.api_crud_livros.entity.Livro;
import br.edu.fema.api_crud_livros.repository.LivroRepository;
import org.springframework.web.bind.annotation.PathVariable;


@Service
public class LivroService {
    @Autowired
    private LivroRepository livroRepository;

    public LivroService(LivroRepository livroRepository) {
        this.livroRepository = livroRepository;
    }

    public Long createLivro(CreateLivroDto createLivroDto) {
        // DTO -> Entity
        var entity = new Livro(
                createLivroDto.titulo(),
                createLivroDto.autor(),
                createLivroDto.sinopse(),
                createLivroDto.anoPublicacao(),
                Boolean.TRUE
                );

        var livroSaved = livroRepository.save(entity);
        return livroSaved.getId();
    }

    public Optional<Livro> getLivrobyId(@PathVariable("livroId") Long id) {
        return livroRepository.findById(id);
    }

    public List<Livro> listLivros() {
        return livroRepository.findAll();
    }

    public void updateLivroById(Long livroId, UpdateLivroDto updateLivroDto) {
        var livroEntity = livroRepository.findById(livroId);

        if (livroEntity.isPresent()) {
            var livro = livroEntity.get();

            if (updateLivroDto.titulo() != null) {
                livro.setTitulo(updateLivroDto.titulo());
            }

            if (updateLivroDto.autor() != null) {
                livro.setAutor(updateLivroDto.autor());
            }

            if (updateLivroDto.sinopse() != null) {
                livro.setSinopse(updateLivroDto.sinopse());
            }

            if (updateLivroDto.anoPublicacao() != null) {
                livro.setAnoPublicacao(updateLivroDto.anoPublicacao());
            }
            livroRepository.save(livro);
        }
    }

    public void deleteById(Long livroId) {
        Optional<Livro> livroOptional = livroRepository.findById(livroId);

        if (livroOptional.isPresent()) {
            Livro livro = livroOptional.get();
            if (livro.getAtivo()) {
                livro.setAtivo(false);
                livroRepository.save(livro);
            } else {
                throw new EntityNotFoundException("O livro já está inativo no sistema");
            }
        } else {
            throw new EntityNotFoundException("O livro não existe no sistema");
        }
    }
}
