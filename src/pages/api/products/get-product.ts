import { NextApiRequest, NextApiResponse } from 'next'
import React from 'react'
import { IProduct } from '../../types/product.type'

async function getProduct(id: number): Promise<IProduct> {
  return {
    id,
    name: `Dark Jean ${id}`,
    contents: '',
    categoryId: 1,
    createdAt: new Date(),
    imageUrl: 'https://picsum.photos/500/500',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  }
}

type Data = {
  items?: IProduct
  message?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { id } = req.query
    if (!id) {
      res.status(400).json({ message: 'Failed' })
      return
    }
    const produdct = await getProduct(Number(id))
    res.status(200).json({ items: produdct })
  } catch (err) {
    res.status(400).json({ message: 'Failed' })
  }
}
