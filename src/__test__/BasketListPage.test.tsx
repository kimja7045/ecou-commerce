import { render } from '@testing-library/react'

import BasketListPage from '@pages/baskets'

describe('장바구니', () => {
  it('장바구니 목록 화면을 출력한다.', () => {
    if (typeof window !== 'object') return
    render(<BasketListPage />)
  })
})
