import { NextApiRequest, NextApiResponse } from 'next'
import { IProduct } from '../../types/product.type'

export async function getProducts() {
  return Array.apply(null, Array(100)).map((_, index) => ({
    id: index,
    name: `Dark Jean ${index + 1}`,
    contents: '',
    categoryId: 1,
    createdAt: new Date(),
    imageUrl: 'https://picsum.photos/500/500',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  }))
}

type ErrorData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IProduct[] | ErrorData>
) {
  try {
    const products = await getProducts()
    res.status(200).json(products)
  } catch (err) {
    res.status(400).json({ message: 'Failed' })
  }
}
