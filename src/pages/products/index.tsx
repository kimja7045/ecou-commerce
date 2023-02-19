import { useState, useCallback, useEffect } from 'react';
import { getProducts } from '@/api/product';
import { IProduct } from '@/types/product';
import { ProductList } from '@/components/Product/ProductList/ProductList';
import { TAKE_PRODUCT_COUNT } from '@/constants/products';
import { api } from '../../api/api';
import { Pagination } from '@mantine/core';

export default function ProductListPage() {
  const [activePage, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProductsCount = useCallback(async () => {
    const productsCount = await api.get('products/get-products-count');
    if (Number.isInteger(productsCount?.data)) {
      setTotal(Math.ceil(productsCount?.data / TAKE_PRODUCT_COUNT));
    }
  }, []);

  useEffect(() => {
    fetchProductsCount();
  }, [fetchProductsCount]);

  const fetchProducts = useCallback(
    async (skip: number) => {
      const newProducts = await getProducts({ skip, take: TAKE_PRODUCT_COUNT });
      setProducts(products.concat(newProducts));
    },
    [products],
  );

  useEffect(() => {
    const skip = TAKE_PRODUCT_COUNT * (activePage - 1);
    fetchProducts(skip);
  }, [activePage, fetchProducts]);

  return (
    <>
      <ProductList products={products} />
      <div className="w-full flex mb-8">
        <Pagination
          className="m-auto"
          page={activePage}
          onChange={setPage}
          total={total}
        />
      </div>
    </>
  );
}
