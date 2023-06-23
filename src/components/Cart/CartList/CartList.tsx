import { Cart } from '@/types/product';
import CartItem from '../CartItem';

interface CartListProps {
  items: Cart[];
}

const CartList = ({ items }: CartListProps) => {
  return (
    <div>
      <span className="text-2xl mb-3">Cart ({items.length})</span>
      <div className="flex">
        <div>
          {items.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
        <div>Info</div>
      </div>
    </div>
  );
};

export default CartList;
