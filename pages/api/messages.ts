import { NextApiRequest, NextApiResponse } from 'next';
import sql from '../../lib/,base/sql';
//TODO migrate to app api
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { message, username } = req.body;
    const timestamp = new Date().toISOString();
    await sql`INSERT INTO aspect_chat_ (username, message, timestamp) VALUES (${username}, ${message}, NOW());`
    res.status(200).json({ success: true });
  } else if (req.method === 'GET') {
    const result = await sql`SELECT * FROM aspect_chat_;`
    res.status(200).json(result);
  } else if (req.method === 'DELETE') {
    const result = await sql`DELETE FROM aspect_chat_;`
    res.status(200).json(result);
  } else if (req.method === 'MKTBL') {
    const result = await sql`CREATE TABLE IF NOT EXISTS aspec_chat_ (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        timestamp DATETIME NOT NULL
      );`
    res.status(200).json(result);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}