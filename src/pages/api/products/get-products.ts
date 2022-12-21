import { NextApiRequest, NextApiResponse } from 'next'
import { IProduct } from '@apis/types/product.type'

export async function fetchProducts() {
  return Array.apply(null, Array(100)).map((_, index) => ({
    id: index,
    name: `Dark Jean ${index + 1}`,
    description: '',
    categoryId: 1,
    createdAt: new Date(),
    image: 'https://picsum.photos/500/500',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
    isVisible: true,
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
    console.log('req', req)
    const products = await fetchProducts()
    res.status(200).json(products)
  } catch (err) {
    res.status(400).json({ message: 'Failed' })
  }
}
