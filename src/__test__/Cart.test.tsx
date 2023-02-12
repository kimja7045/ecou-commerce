import Cart from '@/models/Cart';

describe('장바구니', () => {
  let cart: Cart;

  beforeEach(() => {
    cart = new Cart();
  });

  it('상품을 장바구니에 추가합니다.', () => {
    cart = cart.addItem({ productId: 1, quantity: 1 });
    expect(cart.items).toHaveLength(1);
    cart = cart.addItem({ productId: 2, quantity: 1 });
    expect(cart.items).toHaveLength(2);
  });
});
