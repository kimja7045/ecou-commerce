import { css } from '@emotion/react';
import { client } from '@/api/client';
import { useRef } from 'react';

export default function ProductAddPage() {
  const productNameInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = async () => {
    if (!productNameInputRef?.current?.value) {
      alert('name을 넣어주세요.');
      return;
    }
    await client.post(`products/add-product`, {
      name: productNameInputRef?.current?.value,
    });
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      <input ref={productNameInputRef} type="text" placeholder="name" />
      <button onClick={handleClick}>상품 추가</button>
    </div>
  );
}
