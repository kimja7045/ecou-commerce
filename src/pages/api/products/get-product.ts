import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query
    const produdct = await prisma.products.findUnique({
      where: {
        id: Number(id)
      }
    })
    res.status(200).json(produdct)
  } catch (err) {
    res.status(400).json({ message: 'Failed' })
  }
}
