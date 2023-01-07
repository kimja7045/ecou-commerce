import { NextApiRequest, NextApiResponse } from 'next'
import { IProduct } from '../../../api/types/product.type'
import { notionClient } from "@pages/_app";
import { DB_ID } from "@constants/notion";

export async function fetchProducts() {
  // return Array.apply(null, Array(100)).map((_, api) => ({
  //   id: api,
  //   name: `Dark Jean ${api + 1}`,
  //   description: '',
  //   categoryId: 1,
  //   createdAt: new Date(),
  //   image: 'https://picsum.photos/500/500',
  //   price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  //   isVisible: true,
  // }))
  try {
    if (typeof DB_ID === 'string') {
      const response: IProduct[] = await notionClient.databases.query({
        database_id: DB_ID,
        sorts: [
          {
            property: 'price',
            direction: 'ascending'
          }
        ]
      })
      // console.log(response)
      return response
    }
  } catch (err) {
    console.error(JSON.stringify(err))
  }
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
