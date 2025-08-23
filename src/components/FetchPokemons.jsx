import React, { useEffect, useState } from 'react';

/**
 * Lista paginada sencilla de Pokémon (20 por página).
 * Solo muestra nombres y botones "Anterior / Siguiente".
 */
const FetchPokemons = () => {
  const [data, setData] = useState([]);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [url, setUrl] = useState(
    'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
  );

  /* Cargar página */
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json.results);
        setNext(json.next);
        setPrev(json.previous);
      });
  }, [url]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Pokemones (paginación básica)</h2>

      <div style={{ marginBottom: 8 }}>
        <button disabled={!prev} onClick={() => prev && setUrl(prev)}>
          Anterior
        </button>
        <button
          disabled={!next}
          onClick={() => next && setUrl(next)}
          style={{ marginLeft: 8 }}
        >
          Siguiente
        </button>
      </div>

      <ul>
        {data.map((p) => (
          <li key={p.name}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FetchPokemons;
