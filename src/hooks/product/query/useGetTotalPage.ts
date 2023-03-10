import { useQuery } from '@tanstack/react-query';
import { client } from '@/api/client';
import { TAKE_PRODUCT_COUNT } from '@/constants/products';

const useGetTotalPage = ({
  selectedCategory,
  debouncedKeyword,
}: {
  selectedCategory: string;
  debouncedKeyword: string;
}) => {
  const queryKey = `products/get-products-count?category=${selectedCategory}&contains=${debouncedKeyword}`

  const {data: totalPage = 1} = useQuery<{data: number}, unknown, number>(
    [queryKey], () => client.get(queryKey), {select: data=>data.data}
  )

  return {
    totalPage: Math.ceil(totalPage / TAKE_PRODUCT_COUNT)
  };
};

export default useGetTotalPage;
