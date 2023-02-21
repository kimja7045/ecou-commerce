import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getProducts(skip: number, take: number, categoryId: number) {
  const filter =
    categoryId && categoryId !== -1
      ? {
          where: {
            category_id: categoryId,
          },
        }
      : undefined;

  try {
    const response = await prisma.products.findMany({
      skip,
      take,
      ...filter,
      orderBy: {
        price: 'asc',
      },
    });
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
    const { skip, take, category } = req.query;

    if (!skip || !take) {
      res.status(400).json({ message: 'no skip or take' });
      return;
    }

    if (!Number.isInteger(Number(skip)) || !Number.isInteger(Number(take))) {
      res.status(400).json({ message: 'skip or take is number type' });
      return;
    }

    const products = await getProducts(
      Number(skip),
      Number(take),
      Number(category),
    );
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: 'Failed' });
  }
}
