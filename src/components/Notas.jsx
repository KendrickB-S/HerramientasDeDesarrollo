import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function NotasMarkdown() {
  const [notas, setNotas] = useState([]);
  const [texto, setTexto] = useState("");
  const [editando, setEditando] = useState(null);

  // Cargar notas desde localStorage
  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem("notas-md")) || [];
    setNotas(guardadas);
  }, []);

  // Guardar cuando cambian
  useEffect(() => {
    localStorage.setItem("notas-md", JSON.stringify(notas));
  }, [notas]);

  const guardarNota = () => {
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
      <h2 className="text-primary">Notas con Markdown</h2>

      <div className="row mb-3">
        <div className="col-md-6">
          <textarea
            className="form-control"
            rows="6"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Escribe en Markdown... (# título, **negrita**, *cursiva*, - lista)"
          />
          <button className="btn btn-success mt-2" onClick={guardarNota}>
            {editando !== null ? "💾 Guardar cambios" : "Agregar Nota"}
          </button>
        </div>

        {/* Vista previa Markdown */}
        <div className="col-md-6 border p-3 bg-light rounded">
          <h6 className="text-muted">Vista previa</h6>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {texto || "_Aquí verás tu nota en formato Markdown_"}
          </ReactMarkdown>
        </div>
      </div>

      {/* Listado de notas guardadas */}
      <div className="row">
        {notas.map((nota, i) => (
          <div key={nota.id} className="col-md-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {nota.contenido}
                </ReactMarkdown>
                <div className="mt-2">
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
          </div>
        ))}
      </div>
    </div>
  );
}
