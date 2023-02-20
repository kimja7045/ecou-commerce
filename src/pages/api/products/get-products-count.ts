import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getProductsCount() {
  try {
    const response = await prisma.products.count();
    return response;
  } catch (error) {
    console.error(error);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const productsCount = await getProductsCount();
    res.status(200).json(productsCount);
  } catch (err) {
    console.log(req);
    console.log(err);
    res.status(400).json({ message: 'Failed' });
  }
}
