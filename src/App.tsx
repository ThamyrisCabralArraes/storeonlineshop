import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CarrinhoDeCompras from './components/CarrinhoDeCompras';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Details from './pages/Details';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />

        <Route
          path='/carrinho'
          element={<CarrinhoDeCompras />}
        />

        <Route
          path='/:id'
          element={<Details />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
