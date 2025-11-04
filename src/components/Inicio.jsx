import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faNewspaper, faStore, faGamepad } from '@fortawesome/free-solid-svg-icons';

// Estilo para el "Hero" (Jumbotron)
const heroStyle = {
  backgroundColor: '#e9ecef',
  padding: '4rem 2rem',
  marginBottom: '2rem',
  borderRadius: '0.3rem'
};

const Inicio = () => {
  return (
    <div className="container-fluid p-4">
      {/* Sección Hero */}
      <div style={heroStyle}>
        <h1 className="display-4">Bienvenido a "Herramientas de Desarrollo"</h1>
        <p className="lead">
          Una colección de mini-aplicaciones creadas con React para demostrar diversas funcionalidades,
          desde APIs hasta gestión de estado y juegos.
        </p>
        <hr className="my-4" />
        <p>Navega por el menú de la izquierda para explorar todas las herramientas.</p>
      </div>

    {/* Sección de Tarjetas (Cards) */}
      <h2>Herramientas Destacadas</h2>
      <div className="row">
        
        {/* Card 1: Calculadora */}
        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body b-flex flex-column">
              <h5 className="card-title">
                <FontAwesomeIcon icon={faCalculator} className="me-2" />
                Calculadora
              </h5>
              <p className="card-text">Una calculadora simple para operaciones matemáticas básicas.</p>
              <Link to="/calculadora" className="btn btn-primary mt-auto">Ir a la Calculadora</Link>
            </div>
          </div>
        </div>

        {/* Card 2: Noticias */}
        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body b-flex flex-column">
              <h5 className="card-title">
                <FontAwesomeIcon icon={faNewspaper} className="me-2" />
                Noticias
              </h5>
              <p className="card-text">Ver los últimos titulares de noticias consumiendo una API externa.</p>
              <Link to="/noticias" className="btn btn-primary mt-auto">Ver Noticias</Link>
            </div>
          </div>
        </div>

        {/* Card 3: Tienda */}
        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body b-flex flex-column">
              <h5 className="card-title">
                <FontAwesomeIcon icon={faStore} className="me-2" />
                Mini Tienda
              </h5>
              <p className="card-text">Un E-commerce básico con catálogo de productos y carrito de compras.</p>
              <Link to="/tienda" className="btn btn-primary mt-auto">Ir a la Tienda</Link>
            </div>
          </div>
        </div>

        {/* Card 4: Juego de Cartas (Opcional) */}
        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body b-flex flex-column">
              <h5 className="card-title">
                <FontAwesomeIcon icon={faGamepad} className="me-2" />
                Juego de Cartas
              </h5>
              <p className="card-text">Un juego de memoria (memorama) usando los Pokémon que selecciones.</p>
              <Link to="/CartasGame" className="btn btn-primary mt-auto">Jugar</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Inicio;