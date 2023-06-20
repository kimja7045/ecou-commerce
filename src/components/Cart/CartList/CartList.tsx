import { Cart } from '@/types/product';

interface CartListProps {
  items: Cart[];
}

const CartList = ({ items }: CartListProps) => {
  console.log(items);
  return <div>CartList component</div>;
};

export default CartList;
