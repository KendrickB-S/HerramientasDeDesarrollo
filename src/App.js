import './App.css';

import Clima from './components/Clima';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Formulario from './components/Formulario';
import FetchPokemonsDetalleS from './components/FetchPokemonsDetalleS';
import CartasGame from './components/CartasGame';
import JuegoEspacial from './components/JuegoEspacial';
import Calculadora from './components/Calculadora';
import Trivia from './components/Trivia';
import Estadisticas from "./components/Estadisticas";
import Noticias from './components/Noticias';
import Calendario from './components/Calendario';
import Mapa from "./components/Mapa";
import MapaGoogle from "./components/Mapagoogle";
import Notas from './components/Notas';
import Tienda from './components/Tienda';
import Gastos from './components/Gastos';
import Feed from './components/RedSo/Fedd';



function App() {
  return (
    <Router>
      <div className="d-flex">
        {/* Menú de navegación vertical */}
        <nav className="flex-column p-3 bg-dark text-light" style={{ height: '100vh' }}>
          <h3 className="text-primary">Menú</h3>
          <Link to="/" className="nav-link p-2">Inicio</Link>
          <Link to="/formulario" className="nav-link p-2">Formulario</Link>
          <Link to="/JuegoEspacial" className="nav-link p-2">Juego Espacial</Link>
          <Link to="/FetchPokemonsDetalleS" className='nav-link p-2'>Pokemons detalle</Link>
          <Link to="/CartasGame" className='nav-link p-2'>juego de cartas </Link>
          <Link to="/clima" className="nav-link p-2">Clima</Link>
          <Link to="/calculadora" className="nav-link p-2">Calculadora</Link>
          <Link to="/trivia" className="nav-link p-2">Trivia</Link>
          <Link to="/estadisticas" className="nav-link p-2">Estadísticas</Link>
          <Link to="/noticias" className="nav-link p-2">Noticias</Link>
          <Link to="/calendario" className="nav-link p-2">Calendario</Link>
          <Link to="/mapa" className="nav-link p-2">Mapa</Link>
          <Link to="/mapagoogle" className="nav-link p-2">Mapa Google</Link>
          <Link to="/notas" className="nav-link p-2">Notas</Link>
          <Link to="/tienda" className="nav-link p-2">Tienda</Link>
          <Link to="/gastos" className="nav-link p-2">Gastos</Link>
          <Link to="/redso" className="nav-link p-2">Red Social</Link>

        </nav>

        <div className="proyecto">
          <Routes>
            <Route path="/" element={<h2>Bienvenido a mi aplicación, diversas herramientas para poner en práctica herramientas de React</h2>} />
            <Route path="/formulario" element={<Formulario />} />
            <Route path="/JuegoEspacial" element={<JuegoEspacial />} />
            <Route path='/FetchPokemonsDetalleS' element={<FetchPokemonsDetalleS/>}/>
            <Route path='/CartasGame' element={<CartasGame/>}/>
            <Route path="/clima" element={<Clima />} />
            <Route path="/calculadora" element={<Calculadora />} />
            <Route path="/trivia" element={<Trivia />} />
            <Route path="/estadisticas" element={<Estadisticas />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/mapa" element={<Mapa />} />
            <Route path="/mapagoogle" element={<MapaGoogle />} />
            <Route path="/notas" element={<Notas />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/gastos" element={<Gastos />} />
            <Route path="/redso" element={<Feed />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
