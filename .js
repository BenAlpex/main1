// Vercel Serverless Function: /api/views
// GET  -> mevcut sayıyı döner
// POST -> sayıyı 1 artırır ve yeni sayıyı döner
// Upstash Redis (Vercel Marketplace) bağlıyken çalışır.

module.exports = async (req, res) => {
  const url =
    process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  res.setHeader("Cache-Control", "no-store");

  if (!url || !token) {
    return res.status(500).json({ error: "Redis ortam değişkenleri eksik" });
  }

  const cmd = req.method === "POST" ? "incr" : "get";
  try {
    const r = await fetch(`${url}/${cmd}/portfolyo:views`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await r.json();
    return res.status(200).json({ views: Number(data.result) || 0 });
  } catch (e) {
    return res.status(500).json({ error: "Sayaç okunamadı" });
  }
};
