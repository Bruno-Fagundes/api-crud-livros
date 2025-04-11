import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = {
  getAllLivros: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/livros`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      throw error;
    }
  },

  getLivroById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/livros/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar livro com id ${id}:`, error);
      throw error;
    }
  },

  createLivro: async (livroData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/livros/criar`, {
        ...livroData,
        ativo: true
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao criar livro:', error);
      throw error;
    }
  },

  updateLivro: async (id, livroData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/livros/${id}`, livroData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar livro com id ${id}:`, error);
      throw error;
    }
  },

  deleteLivro: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/livros/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao desativar livro com id ${id}:`, error);
      throw error;
    }
  }
};

export default api;