import { css } from '@emotion/react'
// import { useRef } from 'react'

function add() {
  // const inputRef = useRef<HTMLInputElement | null>(null)

  // const handleClick = async () => {
  //   if (!inputRef?.current?.value) {
  //     alert('name을 넣어주세요.')
  //     return
  //   }
  //   await api.post(`products/add-product`, { name: inputRef?.current?.value })
  // }

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      {/* <input ref={inputRef} type="text" placeholder="name" /> */}
      {/* <button onClick={handleClick}>상품 추가</button> */}
    </div>
  )
}

export default add
