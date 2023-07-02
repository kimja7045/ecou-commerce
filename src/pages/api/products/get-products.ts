import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getOrderBy } from '@/utils/parameter';

const prisma = new PrismaClient();

async function getProducts({
  skip,
  take,
  categoryId,
  orderBy,
  contains,
}: {
  skip: number;
  take: number;
  categoryId: number;
  orderBy: string;
  contains: string;
}) {
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

  const orderByCondition = getOrderBy(orderBy);

  try {
    const response = await prisma.products.findMany({
      skip,
      take,
      ...orderByCondition,
      where: filter,
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
    const { skip, take, category, orderBy, contains } = req.query;

    if (!skip || !take) {
      res.status(400).json({ message: 'no skip or take' });
      return;
    }

    if (!Number.isInteger(Number(skip)) || !Number.isInteger(Number(take))) {
      res.status(400).json({ message: 'skip or take is number type' });
      return;
    }

    const products = await getProducts({
      skip: Number(skip),
      take: Number(take),
      categoryId: Number(category),
      orderBy: String(orderBy),
      contains: contains ? String(contains) : '',
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: 'Failed' });
  }
}
