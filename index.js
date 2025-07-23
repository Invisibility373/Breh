const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies (application/json)
app.use(express.json());

// POST /trigger — save username to triggered.txt
app.post("/trigger", (req, res) => {
  const { username } = req.body;

  if (!username || typeof username !== "string") {
    return res.status(400).send("Invalid or missing username");
  }

  const filePath = path.join(__dirname, "triggered.txt");

  fs.writeFile(filePath, username, (err) => {
    if (err) {
      console.error("Failed to write triggered.txt:", err);
      return res.status(500).send("Failed to save trigger");
    }

    console.log(`Triggered username saved: ${username}`);
    res.send("Trigger saved");
  });
});

// GET /check?username=... — check triggered.txt
app.get("/check", (req, res) => {
  const username = req.query.username;
  if (!username) {
    return res.status(400).send("Missing username query param");
  }

  const filePath = path.join(__dirname, "triggered.txt");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      // If file doesn’t exist, treat as no trigger
      if (err.code === "ENOENT") {
        return res.send("0");
      }
      console.error("Failed to read triggered.txt:", err);
      return res.status(500).send("Error reading trigger");
    }

    if (data === username) {
      // Reset trigger after successful match
      fs.writeFile(filePath, "", (writeErr) => {
        if (writeErr) {
          console.error("Failed to reset triggered.txt:", writeErr);
        }
      });
      return res.send("1");
    }

    res.send("0");
  });
});

// Optional: Serve static files if you want
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
