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
            center: { lat: -12.0464, lng: -77.0428 }, // Lima por defecto
            zoom: 6,
          });

          // 🔹 Ejemplo: marcador inicial
          new window.google.maps.Marker({
            position: { lat: -12.0464, lng: -77.0428 },
            map: mapa,
            title: "Sucursal Lima",
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
      <h2 className="text-xl font-bold mb-2">🗺️ Mapa con Google Maps API</h2>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "500px", borderRadius: "12px" }}
      ></div>
    </div>
  );
}


