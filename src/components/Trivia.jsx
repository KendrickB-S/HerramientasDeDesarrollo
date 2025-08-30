import React, { useState, useEffect } from "react";

function Trivia() {
  const [preguntas, setPreguntas] = useState([]);
  const [indice, setIndice] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [terminado, setTerminado] = useState(false);

// Cargar preguntas desde la API
  useEffect(() => {
    fetch("APYKEY")
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
}

export default Trivia;