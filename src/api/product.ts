import { api } from './api';
import { IProduct } from '@/types/product';

export async function getProducts({
  skip,
  take,
  category,
}: {
  skip: number;
  take: number;
  category: string;
}) {
  const response = await api.get<IProduct[]>(`products/get-products`, {
    params: {
      skip,
      take,
      category,
    },
  });
  return response.data;
}

export async function getProduct(id: number) {
  const response = await api.get<IProduct>(`products/get-product?id=${id}`);
  return response.data;
}
