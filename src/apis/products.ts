import { api } from '@apis/api'
import { IProduct } from '@apis/types/product.type'

export async function getProducts() {
  const response = await api.get<IProduct[]>(`products/get-products`)
  return response.data
}
