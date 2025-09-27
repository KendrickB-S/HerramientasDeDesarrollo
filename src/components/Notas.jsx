import React, { useState, useEffect } from "react";

export default function Notas() {
  const [notas, setNotas] = useState([]);
  const [texto, setTexto] = useState("");
  const [editando, setEditando] = useState(null);

  //Cargar al iniciar
  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem("notas")) || [];
    setNotas(guardadas);
  }, []);

  //Guardar las notas
  useEffect(() => {
    localStorage.setItem("notas", JSON.stringify(notas));
  }, [notas]);
  const agregarNota = () => {
    if (!texto.trim()) return;

    if (editando !== null) {
      // Editar nota existente
      const nuevas = [...notas];
      nuevas[editando].contenido = texto;
      setNotas(nuevas);
      setEditando(null);
    } else {
        // Agregar nueva nota
      setNotas([...notas, { id: Date.now(), contenido: texto }]);
    }
    setTexto("");
  };

  const editarNota = (i) => {
    setTexto(notas[i].contenido);
    setEditando(i);
  };

  const borrarNota = (id) => {
    setNotas(notas.filter((n) => n.id !== id));
  };

}