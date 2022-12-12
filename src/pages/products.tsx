import { useEffect, useState } from 'react'
import { getProducts } from './api/products/get-products'
import { IProduct } from './types/product.type'
import axios from 'axios'
import { api } from '@apis/api'

export default function Products() {
  const [index, setIndex] = useState(0)
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const { data }: { data: IProduct[] } = await api.get(
      `products/get-products`
    )
    setProducts(data)
  }

  console.log(products)

  return <></>
}
