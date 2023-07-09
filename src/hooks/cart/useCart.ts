import { useCallback, useState } from 'react';
import { Cart } from '@/types/product';

const mockData: Cart[] = [
  {
    id: 1,
    name: '나이키 신발',
    productId: 100,
    price: 40000,
    quantity: 2,
    imageUrl: '',
  },
  {
    id: 2,
    name: '나이키 신발',
    productId: 100,
    price: 40000,
    quantity: 3,
    imageUrl: '',
  },
];

const useCart = () => {
  const [cartList, setCartList] = useState<Cart[]>([]);

  const getCartList = useCallback(() => {
    setCartList(mockData);
  }, []);

  const addCart = useCallback(
    (cart: Cart) => {
      setCartList([cart, ...cartList]);
    },
    [cartList],
  );

  const handleDelete = useCallback(
    (id: number) => {
      setCartList(cartList.filter((cart) => cart.id !== id));
    },
    [cartList],
  );

  const handleUpdate = useCallback((id: number) => {
    console.log(id);
  }, []);

  const getCart = useCallback(
    (id: number) => {
      return cartList.find((cart) => cart.id === id);
    },
    [cartList],
  );

  return {
    getCartList,
    cartList,
    getCart,
    addCart,
    handleDelete,
    handleUpdate,
  };
};

export default useCart;
