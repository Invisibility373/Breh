import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { username, triggerId } = req.body;

  if (!username || !triggerId) {
    return res.status(400).send('Missing username or triggerId');
  }

  const filePath = path.join('/tmp', `${username}-${triggerId}.txt`);
  const content = `User: ${username}\nTrigger ID: ${triggerId}`;

  try {
    await fs.promises.writeFile(filePath, content);
    res.status(200).send('Trigger saved');
  } catch (err) {
    res.status(500).send('Error saving trigger');
  }
}
