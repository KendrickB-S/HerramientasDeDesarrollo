// src/pages/Mapa.js
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// 🔹 Corrección del ícono por defecto de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const { BaseLayer } = LayersControl;

export default function Mapa() {
  // 🔹 Marcadores iniciales (ejemplo: sucursales)
  const [markers, setMarkers] = useState([
    { position: [-16.4090, -71.5375], label: "Arequipa" },
    { position: [-16.398803, -71.536919], label: "UTP Arequipa (Av. Parra)" }, // Cambiado a UTP
  ]);

  // 🔹 Agregar marcador al hacer click en el mapa
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setMarkers([...markers, { position: [lat, lng], label: "Nuevo marcador" }]);
  };

  return (
    <MapContainer
      center={[-16.398803, -71.536919]}
      zoom={15}
      style={{ height: "100vh", width: "100%" }}
      whenCreated={(map) => map.on("click", handleMapClick)}
    >
      <LayersControl position="topright">
        {/* 🌍 Capas base */}
        <BaseLayer checked name="Mapa Claro">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
        </BaseLayer>

        <BaseLayer name="Satélite">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles © Esri"
          />
        </BaseLayer>

        <BaseLayer name="Tráfico / Transporte">
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenTopoMap"
          />
        </BaseLayer>
      </LayersControl>

      {/* 📍 Marcadores dinámicos */}
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>{marker.label}</Popup>
        </Marker>
      ))}

      {/* ➡️ Ruta entre los puntos (Polyline) */}
      <Polyline
        positions={markers.map((m) => m.position)}
        color="blue"
      />
    </MapContainer>
  );
}
