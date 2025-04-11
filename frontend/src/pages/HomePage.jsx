import React from 'react';
import LivroList from '../components/LivroList';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-8">Sistema de Gerenciamento de Livros</h1>
      <LivroList />
    </div>
  );
};

export default HomePage;