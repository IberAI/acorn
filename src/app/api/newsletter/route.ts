
import { addEmailToFirestore } from '@/utils/firebase';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const docId = await addEmailToFirestore(email);
      res.status(200).json({ message: 'Subscribed successfully!', id: docId });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  } 
}

