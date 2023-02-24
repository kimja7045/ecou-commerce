import { useState, useCallback, useEffect } from 'react';
import { getProducts } from '@/api/product';
import { IProduct } from '@/types/product';
import { ProductList } from '@/components/Product/ProductList/ProductList';
import { TAKE_PRODUCT_COUNT } from '@/constants/products';
import { api } from '../../api/api';
import { categories } from '@prisma/client';
import CategoryList from '@/components/Product/ProductList/CategoryList';
import PaginationList from '@/components/Common/PaginationList';

export default function ProductListPage() {
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotal] = useState(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categoryList, setCategoryList] = useState<categories[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('-1');

  const fetchCategoryList = useCallback(async () => {
    const categoryList = await api.get('products/get-categories');
    if (Array.isArray(categoryList?.data)) {
      setCategoryList(categoryList?.data);
    }
  }, []);

  const fetchProductsCount = useCallback(async () => {
    const productsCount = await api.get(
      `products/get-products-count?category=${selectedCategory}`,
    );
    if (Number.isInteger(productsCount?.data)) {
      setTotal(Math.ceil(productsCount?.data / TAKE_PRODUCT_COUNT));
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchProductsCount();
    fetchCategoryList();
  }, [fetchProductsCount, fetchCategoryList]);

  const fetchProductList = useCallback(
    async (skip: number) => {
      const newProducts = await getProducts({
        skip,
        take: TAKE_PRODUCT_COUNT,
        category: selectedCategory,
      });
      setProducts(newProducts);
    },
    [selectedCategory],
  );

  useEffect(() => {
    const skip = TAKE_PRODUCT_COUNT * (activePage - 1);
    fetchProductList(skip);
  }, [activePage, fetchProductList]);

  const onSelectCategory = useCallback((selectedCategory: string) => {
    setSelectedCategory(selectedCategory);
    setActivePage(1);
  }, []);

  return (
    <div className="p-36">
      <CategoryList
        categoryList={categoryList}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
      <ProductList products={products} />
      <PaginationList
        activePage={activePage}
        setActivePage={setActivePage}
        totalPage={totalPage}
      />
    </div>
  );
}
