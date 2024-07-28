
import { addEmailToFirestore } from '@/utils/firebase';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;

  try {
    const docId = await addEmailToFirestore(email);
    res.status(200).json({ message: 'Subscribed successfully!', id: docId });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}
