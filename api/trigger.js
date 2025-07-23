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
  const fileContent = `This is a file for user: ${username}`;

  try {
    // Write file to /tmp
    await fs.promises.writeFile(filePath, fileContent);

    // Read file back
    const data = await fs.promises.readFile(filePath, 'utf8');

    console.log(`File content read: ${data}`);

    res.status(200).json({ message: `File created and read successfully`, content: data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('File write/read failed');
  }
}
