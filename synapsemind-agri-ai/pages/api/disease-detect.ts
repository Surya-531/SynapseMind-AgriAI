import type { NextApiRequest, NextApiResponse } from "next"

export const config = {
  api: {
    bodyParser: false, // so Next.js can handle FormData
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: req,
        headers: req.headers as any,
      })

      const data = await response.json()
      return res.status(200).json(data)
    } catch (err) {
      return res.status(500).json({ error: "Failed to call ML API" })
    }
  } else {
    res.status(405).json({ error: "Method not allowed" })
  }
}
