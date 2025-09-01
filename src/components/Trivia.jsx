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


}
