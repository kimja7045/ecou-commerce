import { Cart } from '@/types/product';
import styled from '@emotion/styled';
import CartInfoView from '@/components/Cart/CartInfoView';
import CartItem from '@/components/Cart/CartItem';

interface CartListProps {
  cartList: Cart[];
}

const CartListView = ({ cartList }: CartListProps) => {
  return (
    <Wrapper>
      {cartList.length === 0 ? (
        <div className="text-center">장바구니에 아무것도 없습니다.</div>
      ) : (
        <>
          <CartCount className="text-2xl mb-3">
            Cart ({cartList.length})
          </CartCount>
          <div className="flex">
            <CartItemWrapper className="flex flex-1 flex-col p-4 space-y-4">
              {cartList.map((cart) => (
                <CartItem key={cart.id} cart={cart} />
              ))}
            </CartItemWrapper>
            <CartInfoView totalPrice={0} onPayment={() => null} />
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default CartListView;

const Wrapper = styled.div``;

const CartCount = styled.div``;

const CartItemWrapper = styled.div``;
