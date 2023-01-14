import { api } from './api'
import { IProduct } from '../types/product.type'

export async function getProducts({
  skip,
  take,
}: {
  skip?: number
  take?: number
}) {
  const response = await api.get<IProduct[]>(`products/get-products`, {
    params: {
      skip,
      take,
    },
  })
  return response.data
}

export async function getProduct(id: number) {
  const response = await api.get<IProduct>(`products/get-product?id=${id}`)
  return response.data
}
