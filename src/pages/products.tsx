import { useEffect, useState } from 'react'
import useProducts from '@hooks/product/useProducts'

export default function Products() {
  const products = useProducts()

  useEffect(() => {}, [])

  return (
    <>
      {products?.map((pd, i) => (
        <div key={i}>{pd.name}</div>
      ))}
    </>
  )
}
