// imports
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Inicio } from './components/Inicio';
import { ArticulosFamilias } from './components/ArticulosFamilias';
import Menu from './components/Menu';
import { Footer } from './components/Footer';
import { Articulos } from "./components/articulos/Articulos";
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <div className='divBody'>
          {/* Creamos las rutas necesarias */}
          <Routes>
            <Route path='/inicio' element={<Inicio />} />
            <Route path='/articulosfamilias' element={<ArticulosFamilias />} />
            <Route path='/articulos' element={<Articulos />} />
            <Route path='/*' element={<Inicio />} replace />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;