import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getProductsCount(categoryId: number, contains: string) {
  const containsCondition =
    contains && contains !== '' ? { name: { contains } } : undefined;

  const filter =
    categoryId && categoryId !== -1
      ? {
          category_id: categoryId,
          ...containsCondition,
        }
      : containsCondition
      ? containsCondition
      : undefined;

  try {
    const response = await prisma.products.count({ where: filter });
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
    const { category, contains } = req.query;
    const productsCount = await getProductsCount(
      Number(category),
      String(contains),
    );
    res.status(200).json(productsCount);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed' });
  }
}
