export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  let username = '';

  try {
    if (typeof req.body === 'string') {
      // Body is raw text or JSON string — parse it
      const data = JSON.parse(req.body);
      username = data.username;
    } else {
      // Vercel parses JSON automatically
      username = req.body.username;
    }
  } catch (err) {
    return res.status(400).send('Invalid JSON');
  }

  if (!username) {
    return res.status(400).send('Missing username');
  }

  // Write username to a file in /tmp
  const fs = require('fs');
  const path = `/tmp/${username}.txt`;

  fs.writeFileSync(path, `Checked at ${new Date().toISOString()}`);

  return res.status(200).send(`Username ${username} stored.`);
}
