import { atom, selector } from 'recoil'
import { IProduct } from '@apis/types/product.type'

export const productsState = atom<IProduct[]>({
  key: 'productsState',
  default: [],
})

export const nextProductId = selector({
  key: 'nextProductId',
  get: ({ get }) => {
    const products = get(productsState)
    const lastId = products.at(-1)?.id ?? 0

    return lastId + 1
  },
})
