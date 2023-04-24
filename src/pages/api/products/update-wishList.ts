import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOption } from '../auth/[...nextauth]';

const prisma = new PrismaClient();

async function updateWishList(userId: string, productId: string) {
  try {
    const wishList = await prisma.wishlist.findUnique({
      where: { userId },
    });

    const originWishList =
      wishList?.productIds && wishList?.productIds !== ''
        ? wishList.productIds.split(',')
        : [];

    const isWished = originWishList.includes(productId);

    const newWishList = isWished
      ? originWishList.filter((pdId) => pdId !== productId)
      : [...originWishList, productId];

    const response = await prisma.wishlist.upsert({
      where: { userId },
      update: { productIds: newWishList.join(',') },
      create: { userId, productIds: newWishList.join(',') },
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
  const { productId } = JSON.parse(req.body);
  const session = await getServerSession(req, res, authOption);
  if (!session) {
    res.status(200).json([]);
    return;
  }

  try {
    const wishList = await updateWishList(
      String(session.user?.email),
      String(productId),
    );
    res.status(200).json(wishList);
  } catch (err) {
    res.status(400).json({ message: 'Failed' });
  }
}
