import React, { useEffect, useRef, useState } from "react";

export default function Mapagoogle() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  // Cargar el script dinámicamente desde nuestro endpoint
  useEffect(() => {
    async function cargarMapa() {
      try {
        const res = await fetch("/api/maps");
        const data = await res.json();

        const script = document.createElement("script");
        script.src = data.url;
        script.async = true;
        script.onload = () => {
          // Inicializar mapa cuando el script se cargue
          const mapa = new window.google.maps.Map(mapRef.current, {
            center: { lat: -16.4090, lng: -71.5375 }, // Arequipa centro
            zoom: 13,
          });

          // 🔹 Ejemplo: marcador inicial
          new window.google.maps.Marker({
            position: { lat: -16.4090, lng: -71.5375 }, // Arequipa centro
            map: mapa,
            title: "Centro de Arequipa",
          });

          setMap(mapa);
        };

        document.body.appendChild(script);
      } catch (err) {
        console.error("Error cargando Google Maps:", err);
      }
    }

    if (!map) cargarMapa();
  }, [map]);

  return (
    <div>
      <div
        ref={mapRef}
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          borderRadius: 0,
          zIndex: 1,
        }}
      ></div>
    </div>
  );
}


