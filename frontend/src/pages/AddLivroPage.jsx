import React from 'react';
import LivroForm from '../components/LivroForm';

const AddLivroPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Adicionar Novo Livro</h1>
      <LivroForm />
    </div>
  );
};

export default AddLivroPage;