import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    if (!body.username) {
      return res.status(400).send("Missing username in request");
    }

    const filePath = path.join("/tmp", `${body.username}.txt`);

    if (fs.existsSync(filePath)) {
      return res.status(200).json({ found: true });
    } else {
      return res.status(200).json({ found: false });
    }
  } catch (err) {
    console.error("❌ Server error:", err);
    return res.status(500).send("Internal Server Error");
  }
}
