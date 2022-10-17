import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Products from './components/Products/Products';
import Header from 'components/Header/Header';
import { About } from 'components/About/About';
import { NotFound } from 'components/NotFound/NotFound';
import CreateProduct from 'components/CreateProduct/CreateProduct';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/create" element={<CreateProduct submitDisabled={true} />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
}

export default App;
