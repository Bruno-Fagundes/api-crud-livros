import React from 'react';
import { Link } from 'react-router-dom';

const LivroCard = ({ livro, onDeleteClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-xl font-semibold mb-2">{livro.titulo}</h3>
      <p className="text-gray-700 mb-2">Autor: {livro.autor}</p>
      <p className="text-gray-600 mb-2">Publicado em: {livro.anoPublicacao}</p>
      <div className="flex justify-between mt-4">
        <Link 
          to={`/livro/${livro.id}`} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ver Detalhes
        </Link>
        <button 
          onClick={() => onDeleteClick(livro.id)} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default LivroCard;