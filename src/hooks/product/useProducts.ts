import { useRecoilValue } from 'recoil'
import { productsState } from '@atoms/products'

export default function useProducts() {
  return useRecoilValue(productsState)
}
