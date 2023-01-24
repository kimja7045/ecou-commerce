import Cart from '@/models/Cart';

describe('Cart', () => {
  let cart: Cart;

  beforeEach(() => {
    cart = new Cart();
  });

  it('adds an item', () => {
    cart = cart.addItem({ productId: 1, quantity: 1 });
  });
});
