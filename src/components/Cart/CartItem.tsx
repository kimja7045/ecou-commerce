import React, { useMemo, useState } from 'react';
import useCart from '@/hooks/cart/useCart';
import CartItemView from '@/components/cart/CartItemView';
import { Cart } from '@/types/product';

const CartItem = ({ cart }: { cart: Cart }) => {
  const { handleDelete } = useCart();
  const [itemCount, setItemCount] = useState<number | undefined>(cart.quantity);

  const totalPrice = useMemo(() => {
    if (itemCount) {
      return itemCount * cart?.price;
    }

    return 0;
  }, [cart?.price, itemCount]);

  return (
    <CartItemView
      cart={cart}
      totalPrice={totalPrice}
      itemCount={itemCount}
      onChangeItemCount={setItemCount}
      handleDelete={() => handleDelete(cart.id)}
    />
  );
};

export default CartItem;
