import { productsState } from '@atoms/products'
import { useRecoilValue } from 'recoil'

export default function useProducts() {
  return useRecoilValue(productsState)
}
