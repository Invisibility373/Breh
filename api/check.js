import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { username } = req.body;

  if (!username) {
    return res.status(400).send('Missing username');
  }

  const filePath = path.join('/tmp', `${username}.txt`);

  try {
    // Try to read the file
    const content = await fs.promises.readFile(filePath, 'utf8');

    // File exists — send back success + content
    res.status(200).json({ exists: true, content });
  } catch (err) {
    if (err.code === 'ENOENT') {
      // File does not exist
      res.status(404).json({ exists: false, message: 'File not found' });
    } else {
      // Some other error
      res.status(500).send('Server error');
    }
  }
}
