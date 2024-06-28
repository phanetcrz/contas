import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/home/home.jsx';
import CadConta from './pages/cad-conta/cad-conta.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./styles/global.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contas/:idUrl" element={<CadConta />} />
    </Routes>
  </BrowserRouter>

);


