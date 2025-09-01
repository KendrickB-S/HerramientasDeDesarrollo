import React, { useState, useEffect } from "react";

function Trivia() {
  const [preguntas, setPreguntas] = useState([]);
  const [indice, setIndice] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [terminado, setTerminado] = useState(false);

// Cargar preguntas desde la API
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then((data) => {
        const preguntasFormateadas = data.results.map((p) => {
          const opciones = [...p.incorrect_answers];
          const randomIndex = Math.floor(Math.random() * (opciones.length + 1));
          opciones.splice(randomIndex, 0, p.correct_answer);

          return {
            pregunta: decodeURIComponent(p.question),
            opciones: opciones.map((o) => decodeURIComponent(o)),
            correcta: decodeURIComponent(p.correct_answer),
          };
        });
        setPreguntas(preguntasFormateadas);
      });
  }, []);

  const handleRespuesta = (opcion) => {
    setRespuestaSeleccionada(opcion);
    if (opcion === preguntas[indice].correcta) {
      setPuntaje(puntaje + 1);
    }
  };

  const siguientePregunta = () => {
    if (indice + 1 < preguntas.length) {
      setIndice(indice + 1);
      setRespuestaSeleccionada(null);
    } else {
      setTerminado(true);
    }
  };

  if (preguntas.length === 0) {
    return <h3 className="text-center mt-5">Cargando preguntas...</h3>;
  }

  if (terminado) {
    return (
      <div className="container text-center mt-5">
        <h2>🎉 Trivia terminada</h2>
        <p>Tu puntaje final: <strong>{puntaje} / {preguntas.length}</strong></p>
        <button className="btn btn-primary mt-3" onClick={() => window.location.reload()}>
          Jugar de nuevo
        </button>
      </div>
    );
  }

  // Validar las preguntas
const preguntaActual = preguntas[indice];

if (!preguntaActual) {
  return <h3 className="text-center mt-5">Cargando pregunta...</h3>;
}

  return (
    <div className="container mt-5">
      <h4>Pregunta {indice + 1} de {preguntas.length}</h4>
      <div className="card p-4 shadow-lg">
        <h5>{preguntas[indice].pregunta}</h5>
        <div className="mt-3">
          {preguntas[indice].opciones.map((opcion, i) => (
            <button
              key={i}
              className={`btn w-100 mb-2 ${
                respuestaSeleccionada === opcion
                  ? opcion === preguntas[indice].correcta
                    ? "btn-success"
                    : "btn-danger"
                  : "btn-outline-dark"
              }`}
              onClick={() => handleRespuesta(opcion)}
              disabled={respuestaSeleccionada !== null}
            >
              {opcion}
            </button>
          ))}
        </div>
      </div>
      {respuestaSeleccionada && (
        <button className="btn btn-primary mt-3" onClick={siguientePregunta}>
          Siguiente ➡️
        </button>
      )}
    </div>
  );
}

export default Trivia;