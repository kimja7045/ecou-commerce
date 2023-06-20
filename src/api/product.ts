import { client } from './client';
import { Product } from '@/types/product';

const ProductAPI = {
  getProducts: async ({
    skip,
    take,
    category,
    orderBy,
    contains,
  }: {
    skip: number;
    take: number;
    category: string;
    orderBy: string;
    contains: string;
  }) => {
    const response = await client.get<Product[]>(`products/get-products`, {
      params: {
        skip,
        take,
        category,
        orderBy,
        contains,
      },
    });
    return response.data;
  },
  getProduct: async (id: number) => {
    const response = await client.get<Product>(`products/get-product?id=${id}`);
    return response.data;
  },
};
export default ProductAPI;
