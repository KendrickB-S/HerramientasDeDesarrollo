// src/components/Noticias.jsx
import React, { useEffect, useState } from "react";

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const res = await fetch("/api/news"); // 🚀 pedimos a nuestra API interna
        const data = await res.json();

        if (data.status !== "ok") {
          throw new Error(data.message || "Error al obtener noticias");
        }

        setNoticias(data.articles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  if (loading) return <h3 className="text-center mt-5">Cargando noticias...</h3>;
  if (error) return <h3 className="text-center mt-5">⚠️ {error}</h3>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">📰 Últimas Noticias</h2>
      <div className="row">
        {noticias.map((noticia, i) => (
          <div key={i} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              {noticia.urlToImage && (
                <img
                  src={noticia.urlToImage}
                  alt={noticia.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{noticia.title}</h5>
                <p className="card-text">
                  {noticia.description || "Sin descripción disponible."}
                </p>
                <a
                  href={noticia.url}
                  className="btn btn-primary mt-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Leer más
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
