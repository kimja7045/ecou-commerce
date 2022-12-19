import { api } from '@apis/api'
import { IProduct } from '@apis/types/product.type'

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
