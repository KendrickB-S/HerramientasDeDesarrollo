import React, { useState } from 'react';

const Clima = () => {
  const [ciudad, setCiudad] = useState('');
  const [pais, setPais] = useState('');
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const obtenerClima = async () => {
    setError('');
    setDatos(null);
    setLoading(true);

    const API_KEY = '6c3056bca8fc7600b7a83f84cb755c70'; // Tu API key sin la "Y" final
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${API_KEY}&units=metric&lang=es`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (result.cod === 200) {
        setDatos(result);
      } else {
        setError('Ciudad no encontrada');
      }
    } catch (err) {
      console.error('Error al obtener el clima:', err);
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '420px',
      margin: '2rem auto',
      padding: '2rem',
      background: 'linear-gradient(to right, #2193b0, #6dd5ed)',
      borderRadius: '10px',
      color: 'white',
      textAlign: 'center',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
    }}>
      <h2>BUSCA EL CLIMA</h2>

      {loading && <p>Cargando clima...</p>}
      {error && <p style={{ color: '#ffeb3b' }}>{error}</p>}

      {datos && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Clima en {datos.name}, {datos.sys.country}</h3>
          <h1>{Math.round(datos.main.temp)} °C</h1>
          <p><strong>Descripción:</strong> {datos.weather[0].description}</p>
          <p><strong>Humedad:</strong> {datos.main.humidity}%</p>
          <p><strong>Viento:</strong> {datos.wind.speed} m/s</p>
          <p>🌡️ Máx: {Math.round(datos.main.temp_max)} °C / Mín: {Math.round(datos.main.temp_min)} °C</p>
        </div>
      )}

      <input
        type="text"
        placeholder="Ciudad"
        value={ciudad}
        onChange={(e) => setCiudad(e.target.value)}
        style={{ width: '100%', padding: '10px', marginTop: '1rem', borderRadius: '4px' }}
      />
      <input
        type="text"
        placeholder="País (ej: PE, MX, AR)"
        value={pais}
        onChange={(e) => setPais(e.target.value)}
        style={{ width: '100%', padding: '10px', marginTop: '0.5rem', borderRadius: '4px' }}
      />
      <button
        onClick={obtenerClima}
        disabled={!ciudad || !pais}
        style={{
          marginTop: '1rem',
          padding: '10px 20px',
          background: '#fdd835',
          color: '#333',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        OBTENER CLIMA
      </button>
    </div>
  );
};

export default Clima;
