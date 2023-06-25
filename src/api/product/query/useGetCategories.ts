import { useQuery } from '@tanstack/react-query';
import { categories } from '@prisma/client';
import { client } from '@/api/client';

export const useGetCategories = () => {
  const queryKey = `products/get-categories`;
  const { data: categoryList = [] } = useQuery<
    { data: categories[] },
    unknown,
    categories[]
  >([queryKey], () => client.get(queryKey), {
    select: (data) => data.data,
  });

  return {
    categoryList,
  };
};
