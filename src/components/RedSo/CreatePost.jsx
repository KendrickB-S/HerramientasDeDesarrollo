import React, { useState } from "react";

export default function CreatePost({ onCreate }) {
  const [texto, setTexto] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!texto.trim() && !imagenUrl.trim()) return;
    onCreate({
      id: Date.now(),
      author: "Anónimo",
      content: texto.trim(),
      image: imagenUrl.trim() || null,
      createdAt: new Date().toISOString(),
      likes: 0,
      liked: false,
      comments: []
    });
    setTexto("");
    setImagenUrl("");
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Crear publicación</h5>
        <form onSubmit={handleSubmit}>
          <textarea
            className="form-control mb-2"
            placeholder="¿Qué estás pensando?"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            rows={3}
          />
          <input
            className="form-control mb-2"
            placeholder="URL de imagen (opcional)"
            value={imagenUrl}
            onChange={(e) => setImagenUrl(e.target.value)}
          />
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" type="submit">Publicar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
