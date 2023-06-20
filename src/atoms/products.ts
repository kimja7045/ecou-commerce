import { atom, selector } from 'recoil';
import { Product } from '../types/product';

export const productsState = atom<Product[]>({
  key: 'productsState',
  default: [],
});

export const nextProductId = selector({
  key: 'nextProductId',
  get: ({ get }) => {
    const products = get(productsState);
    const lastId = products.at(-1)?.id ?? 0;

    return lastId + 1;
  },
});
