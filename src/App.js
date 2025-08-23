import './App.css';

import Clima from './components/Clima';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Formulario from './components/Formulario';
import FetchPokemons from './components/FetchPokemons';
import FetchPokemonsDetalleS from './components/FetchPokemonsDetalleS';
import CartasGame from './components/CartasGame';
import JuegoEspacial from './components/JuegoEspacial';


function App() {
  return (
    <Router>
      <div className="d-flex">
        {/* Menú de navegación vertical */}
        <nav className="flex-column p-3 bg-dark text-light" style={{ height: '100vh' }}>
          <h3 className="text-primary">React</h3>
          <Link to="/" className="nav-link p-2">Inicio</Link>
          <Link to="/formulario" className="nav-link p-2">Formulario</Link>
          <Link to="/JuegoEspacial" className="nav-link p-2">Juego Espacial</Link>
          <Link to="/FetchPokemons" className='nav-link p-2'>Pokemons</Link>
          <Link to="/FetchPokemonsDetalleS" className='nav-link p-2'>Pokemons detalle</Link>
          <Link to="/CartasGame" className='nav-link p-2'>juego de cartas </Link>
          <Link to="/clima" className="nav-link p-2">Clima</Link>
          

        </nav>

        <div className="p-3">
          <Routes>
            <Route path="/" element={<h2>Bienvenido a mi página principal</h2>} />
            <Route path="/formulario" element={<Formulario />} />
            <Route path="/JuegoEspacial" element={<JuegoEspacial />} />
            <Route path='/FetchPokemons' element={<FetchPokemons/>}/>
            <Route path='/FetchPokemonsDetalleS' element={<FetchPokemonsDetalleS/>}/>
            <Route path='/CartasGame' element={<CartasGame/>}/>
            <Route path="/clima" element={<Clima />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
