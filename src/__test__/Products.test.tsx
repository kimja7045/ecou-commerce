import { render } from '@testing-library/react'

import CartPage from '@/pages/cart'

describe('상품', () => {
  it('상품 목록 화면을 출력한다.', () => {
    if (typeof window !== 'object') return
    render(<CartPage />)
  })
})