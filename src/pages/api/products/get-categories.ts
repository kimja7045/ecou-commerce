import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getCategories() {
  try {
    const response = await prisma.categories.findMany();
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
    const categories = await getCategories();
    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed' });
  }
}
