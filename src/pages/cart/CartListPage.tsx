import CartList from '@/components/cart/CartList';
import useCart from '@/hooks/cart/useCart';
import { useEffect } from 'react';

export default function CartListPage() {
  const { cartList, getCartList } = useCart();

  useEffect(() => {
    getCartList();
  }, [getCartList]);

  return (
    <div>
      <CartList cartList={cartList} />
    </div>
  );
}
