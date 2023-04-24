import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/api/client';
import { useCallback } from 'react';
import { WISHLIST_QUERY_KEY } from '@constants/Product/queryKey';

const useToggleWishList = (productId: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<unknown, unknown, string, any>(
    (productId: string) =>
      client.post(`products/update-wishList`, { productId }),
    {
      onMutate: async (productId) => {
        await queryClient.cancelQueries([WISHLIST_QUERY_KEY]);

        // Snapshot the previous value
        const previous = queryClient.getQueryData([WISHLIST_QUERY_KEY]);

        // Optimistically update to the new value
        queryClient.setQueryData<string[]>([WISHLIST_QUERY_KEY], (old) =>
          old?.includes(productId)
            ? old?.filter((pdId) => pdId !== productId)
            : old?.concat(productId),
        );

        return { previous };
      },
      onError: (error, _, context) => {
        console.log(error);
        queryClient.setQueryData([WISHLIST_QUERY_KEY], context.previous);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([WISHLIST_QUERY_KEY]);
      },
    },
  );

  const toggleProductWish = useCallback(() => {
    mutate(productId);
  }, [mutate, productId]);

  return {
    toggleProductWish,
  };
};

export default useToggleWishList;
