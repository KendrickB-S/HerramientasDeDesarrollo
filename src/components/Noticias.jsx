import React, { useEffect, useState } from "react";

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ⚠️ Necesitas tu API_KEY de https://newsapi.org
  const API_KEY = "TU_API_KEY";
  const URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const res = await fetch(URL);
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
  
  }