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
  const content = `User: ${username}`;

  try {
    await fs.promises.writeFile(filePath, content);
    console.log(`File created at ${filePath}`);
    res.status(200).send(`File created for ${username}`);
  } catch (err) {
    console.error('File write error:', err);
    res.status(500).send('Failed to write file');
  }
}
