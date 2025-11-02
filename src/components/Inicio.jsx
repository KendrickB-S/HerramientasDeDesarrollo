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