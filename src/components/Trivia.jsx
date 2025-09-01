// src/components/Trivia.js
import React, { useEffect, useState } from "react";

export default function Trivia() {
  const [preguntas, setPreguntas] = useState([]);
  const [indice, setIndice] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [terminado, setTerminado] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // ---- utils
  const shuffleInPlace = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // ---- carga de preguntas (con control de errores y abort)
  const cargarPreguntas = async (signal) => {
    setCargando(true);
    setError(null);
    try {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=10",
        { signal }
      );
      const data = await res.json();

      // Validaciones fuertes
      if (
        !data ||
        typeof data !== "object" ||
        data.response_code !== 0 ||
        !Array.isArray(data.results) ||
        data.results.length === 0
      ) {
        // response_code: 0 ok, 1 sin resultados, 2 parámetro inválido, 3 token vacío, 4 token sin preguntas, 5 rate-limit
        throw new Error(
          `No se recibieron preguntas (code: ${data?.response_code ?? "?"}).`
        );
      }

      const formateadas = data.results.map((p) => {
        const opcionesRaw = [...p.incorrect_answers, p.correct_answer];
        const opciones = shuffleInPlace(opcionesRaw).map((o) =>
          decodeURIComponent(o)
        );
        return {
          pregunta: decodeURIComponent(p.question),
          opciones,
          correcta: decodeURIComponent(p.correct_answer),
        };
      });

      setPreguntas(formateadas);
      setIndice(0);
      setPuntaje(0);
      setRespuestaSeleccionada(null);
      setTerminado(false);
    } catch (e) {
      if (e.name !== "AbortError") {
        console.error(e);
        setError(
          e?.message ||
            "Ocurrió un problema cargando las preguntas. Intenta nuevamente."
        );
        setPreguntas([]); // garantizamos estado consistente
      }
    } finally {
      setCargando(false);
    }
  };

  // ---- reiniciar (DEFINIDA ANTES DE RENDER)
  const reiniciarTrivia = () => {
    setTerminado(false);
    setRespuestaSeleccionada(null);
    setIndice(0);
    // nueva carga (sin recargar la página)
    const controller = new AbortController();
    cargarPreguntas(controller.signal);
    // no necesitamos mantener el controller aquí porque no salimos del componente
  };

  // ---- carga inicial
  useEffect(() => {
    const controller = new AbortController();
    cargarPreguntas(controller.signal);
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- handlers
  const handleRespuesta = (opcion) => {
    setRespuestaSeleccionada(opcion);
    const actual = preguntas[indice];
    if (actual && opcion === actual.correcta) {
      setPuntaje((p) => p + 1);
    }
  };

  const siguientePregunta = () => {
    if (indice + 1 < preguntas.length) {
      setIndice((i) => i + 1);
      setRespuestaSeleccionada(null);
    } else {
      setTerminado(true);
    }
  };

  // ================== RENDER ==================
  if (cargando) {
    return <h3 className="text-center mt-5">Cargando preguntas…</h3>;
  }

  if (error) {
    return (
      <div className="container text-center mt-5">
        <h2>⚠️ Error</h2>
        <p className="mb-3">{error}</p>
        <button className="btn btn-primary" onClick={reiniciarTrivia}>
          Reintentar
        </button>
      </div>
    );
  }

  if (terminado) {
    return (
      <div className="container text-center mt-5">
        <h2>🎉 Trivia terminada</h2>
        <p>
          Tu puntaje final: <strong>{puntaje}</strong> / {preguntas.length}
        </p>
        <button className="btn btn-primary mt-3" onClick={reiniciarTrivia}>
          🔄 Jugar de nuevo
        </button>
      </div>
    );
  }

  const preguntaActual = preguntas[indice];
  if (!preguntaActual) {
    // salvaguarda extra (no debería llegar aquí con las validaciones arriba)
    return <h3 className="text-center mt-5">Preparando pregunta…</h3>;
  }

  return (
    <div className="container mt-5">
      <h4>
        Pregunta {indice + 1} de {preguntas.length}
      </h4>
      <div className="card p-4 shadow-lg">
        <h5>{preguntaActual.pregunta}</h5>
        <div className="mt-3">
          {preguntaActual.opciones.map((opcion, i) => (
            <button
              key={i}
              className={`btn w-100 mb-2 ${
                respuestaSeleccionada === opcion
                  ? opcion === preguntaActual.correcta
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
