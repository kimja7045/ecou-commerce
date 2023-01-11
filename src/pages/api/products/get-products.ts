import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // TODO: req.query string은 추후 사용
    console.log('req', req)
    const products = await prisma.products.findMany()
    res.status(200).json(products)
  } catch (err) {
    res.status(400).json({ message: 'Failed' })
  }
}
