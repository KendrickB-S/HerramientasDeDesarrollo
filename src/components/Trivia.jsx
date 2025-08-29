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

}

export default Trivia;