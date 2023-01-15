import { useMemo } from 'react'
import { useRecoilCallback, useSetRecoilState } from 'recoil'
import { nextProductId, productsState } from '@atoms/products'

export default function useProductsActions() {
  const set = useSetRecoilState(productsState)
  // const nextId = useRecoilValue(nextProductId)
  const add = useRecoilCallback(
    ({ snapshot }) =>
      async (
        name: string,
        contents: string,
        category_id: string,
        price: number
      ) => {
        const nextId = await snapshot.getPromise(nextProductId)
        set((prevState) =>
          prevState.concat({
            id: nextId,
            name,
            contents,
            category_id,
            price,
            createdAt: new Date(),
            isVisible: true,
          })
        )
      },
    [set]
  )

  return useMemo(
    () => ({
      add,
      remove: (id: number) =>
        set((prevState) => prevState.filter((product) => product.id !== id)),
      toggleVisible: (id: number) =>
        set((prevState) =>
          prevState.map((pd) =>
            pd.id === id ? { ...pd, isVisible: !pd.isVisible } : pd
          )
        ),
    }),
    [add, set]
  )
}
