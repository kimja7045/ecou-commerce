import { api } from "./api"
import { IProduct } from "@/types/product.type"

export async function getProducts({
  limit = 9,
  cursor,
}: {
  limit?: number
  cursor?: number
}) {
  const response = await api.get<IProduct[]>(`products/get-products`, {
    params: {
      _sort: 'id:DESC',
      _limit: limit,
      id_lt: cursor,
    },
  })
  return response.data
}

export async function getProduct(id: number) {
  const response = await api.get<IProduct>(`products/get-product?id=${id}`)
  return response.data
}
