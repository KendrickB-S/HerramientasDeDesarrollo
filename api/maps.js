export default async function handler(req, res) {
  try {
    // puedes personalizar los parámetros de la URL
    const url = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_KEY}&libraries=places`;

    res.status(200).json({ url });
  } catch (err) {
    console.error("Error en API Maps:", err);
    res.status(500).json({ status: "error", message: "No se pudo generar el mapa" });
  }
}
