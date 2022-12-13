import { productsState } from '@atoms/products'
import { useRecoilQuery } from '@hooks/useRequilQuery'
import { getProducts } from '@apis/products'

export default function useProducts() {
  // return useRecoilValue(productsState)
  const { state: products } = useRecoilQuery(
    productsState,
    `products`,
    getProducts
  )

  return products
}
