export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { prompt } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.VITE_OPENAI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        style: "natural"
      })
    });

    const data = await response.json();
    console.log("OpenAI response:", JSON.stringify(data));
    
    if (data.data?.[0]?.url) {
      res.status(200).json({ url: data.data[0].url });
    } else {
      res.status(200).json({ error: data.error || "No image generated", full: data });
    }
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
}