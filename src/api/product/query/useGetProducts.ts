import ProductAPI from '@/api/product/product';
import { TAKE_PRODUCT_COUNT } from '@constants/products';
import { Product } from '@/types/product';
import { useQuery } from '@tanstack/react-query';

interface useGetProductsProps {
  activePage?: number;
  selectedCategory?: string;
  selectedFilter?: string | null;
  debouncedKeyword?: string;
}

export const useGetProducts = ({
  activePage = 1,
  selectedCategory = '-1',
  selectedFilter = '',
  debouncedKeyword = '',
}: useGetProductsProps) => {
  const queryKey = `products?skip=${
    TAKE_PRODUCT_COUNT * (activePage - 1)
  }&take=${TAKE_PRODUCT_COUNT}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${debouncedKeyword}`;

  const { data: products = [] } = useQuery<Product[]>(
    [queryKey],
    () =>
      ProductAPI.getProducts({
        skip: TAKE_PRODUCT_COUNT * (activePage - 1),
        take: TAKE_PRODUCT_COUNT,
        category: selectedCategory,
        orderBy: selectedFilter || '',
        contains: debouncedKeyword,
      }),
    // {
    //   suspense: true,
    // },
  );

  return {
    products,
  };
};
