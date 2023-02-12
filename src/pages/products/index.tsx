import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getProducts } from '@/api/product';
import { IProduct } from '@/types/product.type';
import { ProductList } from '@/components/Product/ProductList/ProductList';

const TAKE = 9;
export default function ProductListPage() {
  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery(
    'products',
    () => getProducts({ skip: 0, take: TAKE }),
    // ({ pageParam }) => getProducts({ skip: 0, take: TAKE }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.length === 9 ? lastPage.at(-1)?.id : undefined,
    },
  );

  const products = useMemo(() => {
    if (!data) {
      return null;
    }
    return ([] as IProduct[]).concat(...data.pages);
  }, [data]);

  return (
    <ProductList
      products={products}
      onClickMoreBtn={() => {
        if (hasNextPage && !isFetching) {
          fetchNextPage();
        }
      }}
    />
  );
}
