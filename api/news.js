// api/news.js
export default async function handler(req, res) {
  try {
    const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apiKey=${process.env.NEWS_API_KEY}`;
    const r = await fetch(url);
    const data = await r.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error en API:", err);
    res.status(500).json({ status: "error", message: "No se pudieron cargar las noticias" });
  }
}
