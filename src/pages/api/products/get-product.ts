import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getProduct(id: number) {
  try {
    const response = await prisma.products.findUnique({
      where: {
        id,
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
  const { id } = req.query;
  if (!id) {
    res.status(400).json({ message: 'no id' });
    return;
  }

  try {
    const produdct = await getProduct(Number(id));
    res.status(200).json(produdct);
  } catch (err) {
    res.status(400).json({ message: 'Failed' });
  }
}
