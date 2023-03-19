import { NextApiRequest, NextApiResponse } from 'next';
import jwtDecode from 'jwt-decode';

async function getToken(credential: string) {
  const decoded = jwtDecode(credential);

  try {
    return decoded;
  } catch (error) {
    console.error(error);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { credential } = req.query;
    const productsCount = await getToken(String(credential));
    res.status(200).json(productsCount);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed' });
  }
}
