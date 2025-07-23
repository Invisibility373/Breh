// api/trigger.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { username, html } = req.body;

  if (!username || !html) {
    return res.status(400).send('Missing username or content');
  }

  console.log(`✅ Triggered for ${username}`);

  // Optional: Simulate saving the data to disk or elsewhere
  // You can't use fs.writeFile like in Express on Vercel, but you can log or forward the data

  res.status(200).send('Trigger received');
}
