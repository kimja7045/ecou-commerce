import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getProducts(skip: number, take: number) {
  try {
    const response = await prisma.products.findMany({
      skip,
      take,
    });
    console.log(response);
    return response;
  } catch (error) {}
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { skip, take } = req.query;
    console.log(skip, take, typeof skip, typeof take);

    if (!Number.isInteger(Number(skip)) || !Number.isInteger(Number(take))) {
      alert('쿼리스트링은 정수입니다.');
    } else {
      const products = await getProducts(Number(skip), Number(take));
      res.status(200).json(products);
    }
  } catch (err) {
    res.status(400).json({ message: 'Failed' });
  }
}
