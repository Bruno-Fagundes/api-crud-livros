package br.edu.fema.api_crud_livros.controller;

import br.edu.fema.api_crud_livros.dto.UpdateLivroDto;
import br.edu.fema.api_crud_livros.dto.CreateLivroDto;
import br.edu.fema.api_crud_livros.entity.Livro;
import br.edu.fema.api_crud_livros.service.LivroService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/livros")
public class LivroController {
    @Autowired
    private LivroService livroService;

    public LivroController(LivroService livroService) {
        this.livroService = livroService;
    }

    @PostMapping("/criar")
    public ResponseEntity<Livro> createLivro(@RequestBody CreateLivroDto createLivroDto) {
        var livroId = livroService.createLivro(createLivroDto);
        return ResponseEntity.created(URI.create("/livros" + livroId.toString())).build();
    }

    @GetMapping("/{livroId}")
    public ResponseEntity<Object> getLivrobyId(@PathVariable("livroId") Long id) {
        var livro = livroService.getLivrobyId(id);

        if (livro.isPresent()) {
            return ResponseEntity.ok(livro.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Livro>> listLivros() {
        var livros = livroService.listLivros();
        return ResponseEntity.ok(livros);
    }

    @PutMapping("/{livroId}")
    public ResponseEntity<Void> updateLivroById(@PathVariable("livroId") Long livroId,
                                                @RequestBody UpdateLivroDto updateLivroDto) {
        livroService.updateLivroById(livroId, updateLivroDto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{livroId}")
    public ResponseEntity<Void> deleteById(@PathVariable("livroId") Long livroId) {
        livroService.deleteById(livroId);
        return ResponseEntity.noContent().build();
    }
}
