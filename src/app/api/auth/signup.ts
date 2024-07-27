
import { signUp } from '@/utils/firebase';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  try {
    const userCredential = await signUp(email, password);
    res.status(200).json({ user: userCredential.user });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}
