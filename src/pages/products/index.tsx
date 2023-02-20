import { useState, useCallback, useEffect } from 'react';
import { getProducts } from '@/api/product';
import { IProduct } from '@/types/product';
import { ProductList } from '@/components/Product/ProductList/ProductList';
import { TAKE_PRODUCT_COUNT } from '@/constants/products';
import { api } from '../../api/api';
import { Pagination } from '@mantine/core';
import { categories } from '@prisma/client';
import CategoryList from '@/components/Product/ProductList/CategoryList';

export default function ProductListPage() {
  const [activePage, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categoryList, setCategoryList] = useState<categories[]>([]);

  const fetchCategoryList = useCallback(async () => {
    const categoryList = await api.get('products/get-categories');
    if (Array.isArray(categoryList?.data)) {
      setCategoryList(categoryList?.data);
    }
  }, []);

  const fetchProductsCount = useCallback(async () => {
    const productsCount = await api.get('products/get-products-count');
    if (Number.isInteger(productsCount?.data)) {
      setTotal(Math.ceil(productsCount?.data / TAKE_PRODUCT_COUNT));
    }
  }, []);

  useEffect(() => {
    fetchProductsCount();
    fetchCategoryList();
  }, [fetchProductsCount]);

  const fetchProductList = useCallback(async (skip: number) => {
    const newProducts = await getProducts({ skip, take: TAKE_PRODUCT_COUNT });
    setProducts(products.concat(newProducts));
  }, []);

  useEffect(() => {
    const skip = TAKE_PRODUCT_COUNT * (activePage - 1);
    fetchProductList(skip);
  }, [activePage, fetchProductList]);

  return (
    <div className="p-36">
      <CategoryList categoryList={categoryList} />
      <ProductList products={products} />
      <div className="w-full flex mt-16">
        <Pagination
          className="m-auto"
          page={activePage}
          onChange={setPage}
          total={total}
        />
      </div>
    </div>
  );
}
