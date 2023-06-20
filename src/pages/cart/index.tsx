import { useEffect, useState } from 'react';
import CartList from '@/components/Cart/CartList/CartList';
import { Cart } from '@/types/product';

const mockData: Cart[] = [
  {
    id: 1,
    name: '나이키 신발',
    productId: 100,
    price: 40000,
    quantity: 2,
    image_url: '',
  },
  {
    id: 2,
    name: '나이키 신발',
    productId: 100,
    price: 40000,
    quantity: 2,
    image_url: '',
  },
];

function CartListPage() {
  const [items, setItems] = useState<Cart[]>([]);

  useEffect(() => {
    setItems(mockData);
  }, []);

  return (
    <div>
      <CartList items={items} />
    </div>
  );
}

export default CartListPage;
