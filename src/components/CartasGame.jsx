import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti';
import backImage from '../assets/back.jpg';

const generateCards = (pokemons) =>
  [...pokemons, ...pokemons]
    .sort(() => Math.random() - 0.5)
    .map((p, i) => ({ ...p, id: i, flipped: false, matched: false }));

const CartasGame = () => {
  const flipSound = useRef(new Audio('/sounds/flip.wav'));
  const matchSound = useRef(new Audio('/sounds/match.wav'));
  const mismatchSound = useRef(new Audio('/sounds/mismatch.wav'));
  const victorySound = useRef(new Audio('/sounds/victory.mp3'));

  const saved = JSON.parse(localStorage.getItem('selectedPokemons') || '[]');
  const pokes = saved.slice(0, 20);
  const noPokemons = pokes.length === 0;

  const [cards, setCards] = useState(() => generateCards(pokes));
  const [flipped, setFlipped] = useState([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos
  const [gameOver, setGameOver] = useState(false);

  // ✅ Declarar antes de usar
  const victory = cards.every(c => c.matched);

  // Temporizador
  useEffect(() => {
    if (victory || gameOver) return;
    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, victory, gameOver]);

  const handleClick = (card) => {
    if (flipped.length === 2 || card.flipped || card.matched || gameOver || victory) return;

    flipSound.current.currentTime = 0;
    flipSound.current.play();

    setCards(prev => prev.map(c => c.id === card.id ? { ...c, flipped: true } : c));
    setFlipped([...flipped, card]);
  };

  useEffect(() => {
    if (flipped.length !== 2) return;
    const [a, b] = flipped;

    if (a.name === b.name) {
      matchSound.current.currentTime = 0;
      matchSound.current.play();
      setCards(prev => prev.map(c => c.name === a.name ? { ...c, matched: true } : c));
      setScore(prev => prev + 2);
    } else {
      mismatchSound.current.currentTime = 0;
      mismatchSound.current.play();
      setTimeout(() => {
        setCards(prev => prev.map(c =>
          c.id === a.id || c.id === b.id ? { ...c, flipped: false } : c
        ));
      }, 800);
    }
    setFlipped([]);
    setMoves(m => m + 1);
  }, [flipped]);

  useEffect(() => {
    if (victory) {
      victorySound.current.currentTime = 0;
      victorySound.current.play();
      confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
    }
  }, [victory]);

  const reset = () => {
    setCards(generateCards(pokes));
    setFlipped([]);
    setMoves(0);
    setScore(0);
    setTimeLeft(300);
    setGameOver(false);
  };

  if (noPokemons) {
    return (
      <p style={{ padding: 20 }}>
        No hay Pokémon seleccionados. Ve a <em>Pokémon Detalle</em>,
        elige al menos dos y vuelve.
      </p>
    );
  }

  const formatTime = (t) => {
    const min = Math.floor(t / 60).toString().padStart(2, '0');
    const sec = (t % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Cartas Game – Busca el Par</h2>
      <button onClick={reset} style={{ marginBottom: 12 }}>
        <FontAwesomeIcon icon={faRedo} /> Reiniciar
      </button>
      <p>Movimientos: {moves} | Puntaje: {score} | Tiempo restante: {formatTime(timeLeft)}</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 100px)',
        gap: 14,
        maxWidth: 1450,
      }}>
        {cards.map(card => (
          <div
            key={card.id}
            onClick={() => handleClick(card)}
            style={{
              width: 100,
              height: 140,
              perspective: 600,
              cursor: card.flipped || card.matched || gameOver || victory ? 'default' : 'pointer',
            }}
          >
            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              transition: 'transform 0.4s',
              transformStyle: 'preserve-3d',
              transform: card.flipped || card.matched ? 'rotateY(180deg)' : '',
            }}>
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                backgroundImage: `url(${backImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderRadius: 8,
                border: '2px solid #c97a00',
              }} />
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: '#fff',
                borderRadius: 8,
                border: '2px solid #ddd',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                {(card.flipped || card.matched) && (
                  <img src={card.image} alt={card.name} style={{ width: 70 }} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {victory && (
        <h3 style={{ marginTop: 18, color: '#28a745' }}>
          ¡Ganaste en {moves} movimientos! Puntaje final: {score}
        </h3>
      )}

      {gameOver && !victory && (
        <h3 style={{ marginTop: 18, color: '#dc3545' }}>
          ⏱ Tiempo agotado. Fin del juego. Puntaje final: {score}
        </h3>
      )}
    </div>
  );
};

export default CartasGame;
