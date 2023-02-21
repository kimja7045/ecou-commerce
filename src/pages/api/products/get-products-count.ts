import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getProductsCount(categoryId: number) {
  const filter =
    categoryId && categoryId !== -1
      ? {
          where: {
            category_id: categoryId,
          },
        }
      : undefined;

  try {
    const response = await prisma.products.count(filter);
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
    const { category } = req.query;
    const productsCount = await getProductsCount(Number(category));
    res.status(200).json(productsCount);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed' });
  }
}
