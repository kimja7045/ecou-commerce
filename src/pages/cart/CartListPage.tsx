import CartListView from '@/components/cart/CartListView';
import useCart from '@/hooks/cart/useCart';
import { useEffect } from 'react';

export default function CartListPage() {
  const { cartList, getCartList } = useCart();

  useEffect(() => {
    getCartList();
  }, [getCartList]);

  return (
    <div>
      <CartListView cartList={cartList} />
    </div>
  );
}
