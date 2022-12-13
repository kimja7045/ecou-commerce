import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getProducts } from '@apis/products'

export default function Products() {
  const [index, setIndex] = useState(0)
  const { data, isLoading } = useQuery(`products`, getProducts)

  console.log('data', data)
  useEffect(() => {}, [])

  return (
    <>
      {data?.map((pd, i) => (
        <div key={i}>{pd.name}</div>
      ))}
    </>
  )
}
