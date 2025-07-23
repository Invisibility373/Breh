import express from 'express';
import fs from 'fs/promises';

const app = express();
const PORT = process.env.PORT || 3000;
const TRIGGER_FILE = './triggered.txt';

app.use(express.json());

// POST /trigger — save username to file
app.post('/trigger', async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).send('Missing username');
    }
    await fs.writeFile(TRIGGER_FILE, username, 'utf8');
    console.log(`Triggered username saved: ${username}`);
    res.send('OK');
  } catch (err) {
    console.error('Error writing trigger file:', err);
    res.status(500).send('Internal Server Error');
  }
});

// GET /check?username=xyz — check username from file
app.get('/check', async (req, res) => {
  try {
    const username = req.query.username;
    if (!username) {
      return res.status(400).send('Missing username');
    }
    const storedUsername = await fs.readFile(TRIGGER_FILE, 'utf8').catch(() => '');
    if (username === storedUsername) {
      await fs.writeFile(TRIGGER_FILE, '', 'utf8'); // reset trigger
      return res.send('1');
    }
    res.send('0');
  } catch (err) {
    console.error('Error reading trigger file:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Optional root route for quick test
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
