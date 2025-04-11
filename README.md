# API CRUD Livros 

API para gerenciamento de livros com operações CRUD, desenvolvida com Java Spring Boot e React.  

**Recursos principais:**  
- Cadastro de livros  
- Editar informações dos livros  
- Exclusão lógica (marcar como inativo)  
- Listagem de todos os livros (aqueles marcados como ativos)  
- Documentação Swagger  

---

## Campos do Livro no Banco de Dados

- int id;
- String titulo;
- String autor;
- String sinopse;
- int anoPublicacao;
- bool ativo;

---

## Para que funcione

Execute os comandos abaixo no terminal, certifique se de seguir nesta ordem

```bash
docker-compose up -d

mvn spring-boot:run

cd frontend
npm start 
```

## 🛠 Tecnologias Utilizadas

### Backend
- **Java 21**
- **Spring Boot 3**
- **Spring Data JPA**
- **PostgreSQL**
- **Maven**
- **Docker**

### Frontend
- **React**
- **Tailwind CSS**
- **Axios**
- **React Router**
