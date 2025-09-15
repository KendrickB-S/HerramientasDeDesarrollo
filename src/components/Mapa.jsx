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
        center={[40.4168, -3.7038]} // Madrid como ejemplo
        zoom={5}
        style={{ height: "500px", width: "100%", borderRadius: "12px" }}
      >
        {/* Fondo del mapa */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Ejemplo de marcador */}
        <Marker position={[40.4168, -3.7038]} icon={customIcon}>
          <Popup>
            📍 <b>Madrid</b> <br /> Ejemplo de marcador en el mapa.
          </Popup>
        </Marker>

        <Marker position={[48.8566, 2.3522]} icon={customIcon}>
          <Popup>
            📍 <b>París</b> <br /> Otro marcador de ejemplo.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}