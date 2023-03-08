import { ProductListView } from '@/components/Product/ProductList/ProductListView';
import { IProduct } from '@/types/product';
import { render } from '@testing-library/react';

const products: IProduct[] = [
  {
    id: 1,
    name: '상품1',
    contents: '상품설명1',
    category_id: 1,
    createdAt: new Date(),
    price: 10000,
    isVisible: true,
  },
];

describe('상품', () => {
  it('목록을 출력합니다.', () => {
    if (typeof window !== 'object') {return}
    render(<ProductListView products={products} />);
  });
});
