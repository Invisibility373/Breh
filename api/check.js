import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { username } = req.body;

  if (!username) {
    return res.status(400).send('Missing username');
  }

  const dir = '/tmp';

  try {
    const files = await fs.promises.readdir(dir);

    // Filter files for this username
    const userTriggers = files
      .filter(f => f.startsWith(username + '-'))
      .map(f => f.replace(username + '-', '').replace('.txt', ''));

    if (userTriggers.length === 0) {
      return res.status(404).json({ exists: false, message: 'No triggers found' });
    }

    res.status(200).json({ exists: true, triggerIds: userTriggers });
  } catch (err) {
    res.status(500).send('Server error');
  }
}
