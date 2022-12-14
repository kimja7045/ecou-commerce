import { useMemo } from 'react'
import { useInfiniteQuery } from 'react-query'
import { getProducts } from '../../api/product'
// import Image from 'next/image'
import { IProduct } from '../../types/product.type'

export default function ProductListPage() {
  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery(
    'products',
    ({ pageParam }) => getProducts({ cursor: pageParam }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.length === 9 ? lastPage.at(-1)?.id : undefined,
    }
  )

  const products = useMemo(() => {
    if (!data) {
      return null
    }
    return ([] as IProduct[]).concat(...data.pages)
  }, [data])

  return (
    <div className="px-36 my-36">
      {products && (
        <div className="grid grid-cols-3 gap-5">
          {products.map(
            (pd, i) =>
              i < 9 && (
                <div key={pd.id}>
                  {/* <Image
                    className="rounded"
                    src={pd?.image_url ?? ''}
                    alt={pd.name}
                    width={300}
                    height={200}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8p6NTDwAEnQGnwx5bWgAAAABJRU5ErkJggg=="
                  /> */}
                  <div className="flex">
                    <span>{pd.name}</span>
                    <span className="ml-auto">
                      {pd?.price?.toLocaleString('ko-KR')}원
                    </span>
                  </div>
                  <span className="text-zinc-400">
                    {pd.category_id === '1' && '의류'}
                  </span>
                </div>
              )
          )}
        </div>
      )}
      <button
        className="w-full rounded mt-20 bg-zinc-200 p-4"
        onClick={() => {
          if (hasNextPage && !isFetching) {
            fetchNextPage()
          }
        }}
      >
        더보기
      </button>
    </div>
  )
}
