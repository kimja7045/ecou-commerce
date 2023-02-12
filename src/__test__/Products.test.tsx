import ProductListPage from '@/pages/products';
import { render } from '@testing-library/react';

describe('상품', () => {
  it('목록을 출력합니다.', () => {
    if (typeof window !== 'object') return;
    render(<ProductListPage />);
  });
});
