import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

export default function Mapa() {
  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">🌍 Mapa Interactivo</h2>
      <MapContainer
        center={[-16.4090,-71.5375]} // Ejemplo de coordenadas
        zoom={13}
        style={{ height: "500px", width: "100%", borderRadius: "12px" }}
      >
        {/* Fondo del mapa */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Ejemplo de marcador */}
        <Marker position={[-16.398803, -71.536919]} icon={customIcon}>
          <Popup>
            📍 <b>Arequipa</b> <br /> Ejemplo de marcador en el mapa.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}