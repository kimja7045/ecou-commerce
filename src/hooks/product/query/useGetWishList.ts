import { useQuery } from '@tanstack/react-query';
import { client } from '@/api/client';

const useGetWishList = () => {
  const queryKey = `products/get-wishList`;
  const { data: wishList = [] } = useQuery<
    { data: string[] },
    unknown,
    string[]
  >([queryKey], () => client.get('products/get-categories'), {
    select: (data) => data.data,
  });

  return {
    wishList,
  };
};

export default useGetWishList;
