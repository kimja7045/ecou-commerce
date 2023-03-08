import { useQuery } from '@tanstack/react-query';
import { categories } from '@prisma/client';
import { client } from '@/api/client';

const useGetCategories = () => {
  const queryKey = `products/get-categories`;
  const { data: categoryList = [] } = useQuery<
    { data: categories[] },
    unknown,
    categories[]
  >([queryKey], () => client.get('products/get-categories'), {
    select: (data) => data.data,
  });

  return {
    categoryList,
  };
};

export default useGetCategories;
