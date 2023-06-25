import { useQuery } from '@tanstack/react-query';
import { client } from '@/api/client';

const WISHLIST_QUERY_KEY = `products/get-wishList`;

const useGetWishList = () => {
  const { data: wishList = [] } = useQuery<
    { data: string[] },
    unknown,
    string[]
  >([WISHLIST_QUERY_KEY], () => client.get(WISHLIST_QUERY_KEY), {
    select: (data) => data.data,
  });

  return {
    wishList,
  };
};

export default useGetWishList;
