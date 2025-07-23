import express from 'express';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let trigger = "";

// POST /trigger
app.post('/trigger', (req, res) => {
  const { username } = req.body;
  trigger = username;
  console.log(`Triggered for ${username}`);
  res.send("OK");
});

// GET /check?username=NAME
app.get('/check', (req, res) => {
  const username = req.query.username;
  if (username === trigger) {
    trigger = ""; // reset
    return res.send("1");
  }
  res.send("0");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
