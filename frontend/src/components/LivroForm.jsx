import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const LivroForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Captura o ID da URL se existir
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    sinopse: '',
    anoPublicacao: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Busca os dados do livro se for edição
  useEffect(() => {
    if (id) {
      const fetchLivro = async () => {
        try {
          setLoading(true);
          const livro = await api.getLivroById(id);
          setFormData({
            titulo: livro.titulo,
            autor: livro.autor,
            sinopse: livro.sinopse || '',
            anoPublicacao: livro.anoPublicacao.toString()
          });
        } catch (err) {
          console.error('Erro ao buscar livro:', err);
          setError('Livro não encontrado!');
          navigate('/');
        } finally {
          setLoading(false);
        }
      };
      fetchLivro();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'anoPublicacao' ? (value ? parseInt(value, 10) : '') : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.titulo || !formData.autor || !formData.anoPublicacao) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    try {
      setLoading(true);
      
      if (id) {
        // Modo edição: PUT
        await api.updateLivro(id, formData);
      } else {
        // Modo criação: POST
        await api.createLivro(formData);
      }
      
      navigate('/');
    } catch (err) {
      console.error('Erro ao salvar livro:', err);
      setError(`Erro ao ${id ? 'atualizar' : 'adicionar'} livro. Tente novamente.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {id ? 'Editar Livro' : 'Adicionar Novo Livro'}
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {/* Campos mantidos iguais */}
        <div className="mb-4">
          <label htmlFor="titulo" className="block text-gray-700 font-semibold mb-2">
            Título *
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="autor" className="block text-gray-700 font-semibold mb-2">
            Autor *
          </label>
          <input
            type="text"
            id="autor"
            name="autor"
            value={formData.autor}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="anoPublicacao" className="block text-gray-700 font-semibold mb-2">
            Ano de Publicação *
          </label>
          <input
            type="number"
            id="anoPublicacao"
            name="anoPublicacao"
            value={formData.anoPublicacao}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="sinopse" className="block text-gray-700 font-semibold mb-2">
            Sinopse
          </label>
          <textarea
            id="sinopse"
            name="sinopse"
            value={formData.sinopse}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading 
              ? (id ? 'Atualizando...' : 'Salvando...') 
              : (id ? 'Atualizar Livro' : 'Salvar Livro')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LivroForm;