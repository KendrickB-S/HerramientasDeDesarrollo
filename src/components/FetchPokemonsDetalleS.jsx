import React, { useState, useEffect } from 'react';

const FetchPokemonsDetalleS = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState(null);


  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem('selectedPokemons');
    return saved ? JSON.parse(saved) : [];
  });

  const isSelected = (name) => selected.some((p) => p.name === name);
  const getSprite = (p) =>
    p.sprites?.other?.dream_world?.front_default || p.sprites?.front_default || '';

  const toggle = (poke) => {
    if (!poke) return;
    const updated = isSelected(poke.name)
      ? selected.filter((p) => p.name !== poke.name)
      : [...selected, { name: poke.name, image: getSprite(poke) }];
    setSelected(updated);
    localStorage.setItem('selectedPokemons', JSON.stringify(updated));
  };

  const fetchList = (url) => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const fetchPokemonDetails = (url) => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPokemonDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchList('https://pokeapi.co/api/v2/pokemon/');
  }, []);

  const handleNextPage = () => nextPage && fetchList(nextPage);
  const handlePreviousPage = () => previousPage && fetchList(previousPage);
  const handlePokemonClick = (url) => {
    fetchPokemonDetails(url);
  };

  const styles = {
    container: { display: 'inline-flex', padding: '20px', gap: '20px' },
    columnLeft: { flex: 1 },
    columnRight: {
      flex: 1, border: '1px solid #ccc', borderRadius: '8px', padding: '16px',
    },
    pokemonList: { listStyle: 'none', padding: 0 },
    pokemonItem: { marginBottom: '8px' },
    pokemonLink: {
      color: '#2c3e50', textDecoration: 'none', fontWeight: 'bold', cursor: 'pointer',
      background: 'none', 
      border: 'none',     
      padding: 0,         
      textAlign: 'left' 
    },
    
    pagination: { marginTop: '16px', display: 'flex', gap: '10px' },
    paginationButton: {
      padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc',
      cursor: 'pointer', backgroundColor: '#3498db', color: '#fff',
    },
    urlBox: { marginTop: '20px' },
    imageContainer: { marginBottom: '16px', textAlign: 'center' },
    pokemonImage: { width: '120px', height: '120px' },
    horizontalScroll: {
      display: 'flex', overflowX: 'auto', gap: '10px', padding: 0, listStyle: 'none',
    },
    scrollItem: {
      backgroundColor: '#eee', padding: '6px 10px', borderRadius: '6px', whiteSpace: 'nowrap',
    },
    topBar: { display: 'flex', gap: 18, overflowX: 'auto', marginBottom: 24, padding: '0 20px' },
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {/* BARRA DE POKÉMON SELECCIONADOS */}
      <h2 style={{ paddingLeft: 20 }}>Pokémon Seleccionados</h2>
      <div style={styles.topBar}>
        {selected.length === 0 ? (
          <p style={{ opacity: 0.6 }}>Ninguno aún</p>
        ) : (
          selected.map((p) => (
            <div key={p.name} style={{ textAlign: 'center' }}>
              <img src={p.image} alt={p.name} style={{ width: 60, height: 60 }} />
              <p style={{ fontSize: 12 }}>{p.name}</p>
            </div>
          ))
        )}
      </div>

      <div style={styles.container}>
        <div style={styles.columnLeft}>
          <h2>Lista de Pokémon</h2>
          <ul style={styles.pokemonList}>
            {data.map((pokemon) => (
              <li key={pokemon.name} style={styles.pokemonItem}>
                <button
                  href="#"
                  onClick={() => handlePokemonClick(pokemon.url)}
                  style={styles.pokemonLink}
                >
                  {pokemon.name}
                </button>
              </li>
            ))}
          </ul>

          <div style={styles.pagination}>
            <button
              onClick={handlePreviousPage}
              disabled={!previousPage}
              style={styles.paginationButton}
            >
              Anterior
            </button>
            <button
              onClick={handleNextPage}
              disabled={!nextPage}
              style={styles.paginationButton}
            >
              Siguiente
            </button>
          </div>
        </div>

        <div style={styles.columnRight}>
          {pokemonDetails && (
            <div style={styles.urlBox}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ textTransform: 'uppercase' }}>{pokemonDetails.name}</h3>
                <button
                  onClick={() => toggle(pokemonDetails)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 4,
                    background: isSelected(pokemonDetails.name) ? '#28a745' : '#ffc400',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  {isSelected(pokemonDetails.name) ? 'Seleccionado' : 'Seleccionar'}
                </button>
              </div>

              {pokemonDetails.sprites?.other?.dream_world?.front_default && (
                <div style={styles.imageContainer}>
                  <img
                    src={pokemonDetails.sprites.other.dream_world.front_default}
                    alt={pokemonDetails.name}
                    style={styles.pokemonImage}
                  />
                </div>
              )}

              <p><strong>Altura:</strong> {pokemonDetails.height * 10} cm.</p>
              <p><strong>Peso:</strong> {pokemonDetails.weight / 10} kg.</p>

              <h4>Tipos:</h4>
              <ul style={styles.horizontalScroll}>
                {pokemonDetails.types.map((t) => (
                  <li key={t.type.name} style={styles.scrollItem}>{t.type.name}</li>
                ))}
              </ul>

              <h4>Habilidades:</h4>
              <ul style={styles.horizontalScroll}>
                {pokemonDetails.abilities.map((a) => (
                  <li key={a.ability.name} style={styles.scrollItem}>{a.ability.name}</li>
                ))}
              </ul>

              <h4>Movimientos:</h4>
              <ul style={styles.horizontalScroll}>
                {pokemonDetails.moves.slice(0, 5).map((m) => (
                  <li key={m.move.name} style={styles.scrollItem}>{m.move.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FetchPokemonsDetalleS;



