import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOption } from '../auth/[...nextauth]';

const prisma = new PrismaClient();

async function getWishList(userId: string) {
  try {
    const response = await prisma.wishlist.findUnique({
      where: {
        userId,
      },
    });
    return response?.productIds.split(',');
  } catch (error) {
    console.error(error);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOption);
  if (!session) {
    res.status(200).json([]);
    return;
  }

  try {
    const wishlist = await getWishList(String(session.user?.email));
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(400).json({ message: 'Failed' });
  }
}
