import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LivroList from './components/LivroList';
import LivroForm from './components/LivroForm';
import LivroDetail from './components/LivroDetail';
import './index.css';
import './styles.css'; 

function App() {
  return (
    <Router>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Biblioteca Digital</h1>
        <h2 className="text-xl mb-4">Sistema de Gerenciamento de Livros</h2>
        
        <Routes>
          <Route path="/" element={<LivroList />} />
          <Route path="/adicionar" element={<LivroForm />} />
          <Route path="/editar/:id" element={<LivroForm />} />
          <Route path="/detalhes/:id" element={<LivroDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;