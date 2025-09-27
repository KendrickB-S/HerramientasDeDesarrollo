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