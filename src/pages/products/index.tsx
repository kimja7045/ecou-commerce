import { useState, useCallback, useEffect } from 'react';
import { ProductListView } from '@/components/Product/ProductList/ProductListView';
import { TAKE_PRODUCT_COUNT, FILTER_LIST } from '@/constants/products';
import { client } from '@/api/client';
import { categories } from '@prisma/client';
import CategoryList from '@/components/Product/ProductList/CategoryList';
import PaginationList from '@/components/Product/ProductList/PaginationList';
import ListSelect from '@/components/Product/ProductList/ListSelect';
import SearchInput from '@/components/Product/ProductList/SearchInput';
import useDebounce from '@/hooks/common/useDebounce';
import ProductAPI from '@/api/product';
import { useQuery } from '@tanstack/react-query';
import { IProduct } from '@/types/product';
import useGetProducts from '@/hooks/query/useGetProducts';

export default function ProductListPage() {
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotal] = useState(1);
  const [categoryList, setCategoryList] = useState<categories[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('-1');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(
    FILTER_LIST[0].value,
  );
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const debouncedKeyword = useDebounce<string>(searchKeyword);

  const { products } = useGetProducts({
    activePage, selectedCategory, selectedFilter, debouncedKeyword
  })
// TODO: 다른 API도 다 react-query 적용하기(캐싱->호출 최소화)

  const fetchCategoryList = useCallback(async () => {
    const categoryList = await client.get('products/get-categories');
    if (Array.isArray(categoryList?.data)) {
      setCategoryList(categoryList?.data);
    }
  }, []);

  const fetchProductsCount = useCallback(async () => {
    const productsCount = await client.get(
      `products/get-products-count?category=${selectedCategory}&contains=${debouncedKeyword}`,
    );
    if (Number.isInteger(productsCount?.data)) {
      setTotal(Math.ceil(productsCount?.data / TAKE_PRODUCT_COUNT));
    }
  }, [selectedCategory, debouncedKeyword]);

  useEffect(() => {
    fetchProductsCount();
    fetchCategoryList();
  }, [fetchProductsCount, fetchCategoryList]);

  const onSelectCategory = useCallback((selectedCategory: string) => {
    setSelectedCategory(selectedCategory);
    setActivePage(1);
  }, []);

  const onChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchKeyword(e.target.value);
    },
    [],
  );

  return (
    <div className="p-36">
      <SearchInput value={searchKeyword} onChange={onChangeKeyword} />
      <ListSelect
        selectedValue={selectedFilter}
        setSelectedValue={setSelectedFilter}
      />
      <CategoryList
        categoryList={categoryList}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
      <ProductListView products={products} />
      <PaginationList
        activePage={activePage}
        setActivePage={setActivePage}
        totalPage={totalPage}
      />
    </div>
  );
}
