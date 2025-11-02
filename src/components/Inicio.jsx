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
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">
                <FontAwesomeIcon icon={faCalculator} className="me-2" />
                Calculadora
              </h5>
              <p className="card-text">Una calculadora simple para operaciones matemáticas básicas.</p>
              <Link to="/calculadora" className="btn btn-primary mt-auto">Ir a la Calculadora</Link>
            </div>
          </div>
        </div>