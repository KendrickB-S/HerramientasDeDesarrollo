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

  
return (
    <div className="container mt-5">
      <h2 className="text-primary">Mis Notas</h2>

      <div className="mb-3">
        <textarea
          className="form-control"
          rows="4"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribe tu nota aquí..."
        />
        <button className="btn btn-success mt-2" onClick={agregarNota}>
          {editando !== null ? "Guardar cambios" : "Agregar Nota"}
        </button>
      </div>

      <div className="row">
        {notas.map((nota, i) => (
          <div key={nota.id} className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <p>{nota.contenido}</p>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editarNota(i)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => borrarNota(nota.id)}
                >
                  Borrar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}