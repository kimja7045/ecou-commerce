import { useState, useCallback, useEffect } from 'react';
import { ProductListView } from '@/components/Product/ProductList/ProductListView';
import { TAKE_PRODUCT_COUNT, FILTER_LIST } from '@/constants/products';
import { client } from '@/api/client';
import CategoryList from '@/components/Product/ProductList/CategoryList';
import PaginationList from '@/components/Product/ProductList/PaginationList';
import ListSelect from '@/components/Product/ProductList/ListSelect';
import SearchInput from '@/components/Product/ProductList/SearchInput';
import useDebounce from '@/hooks/common/useDebounce';
import useGetProducts from '@/hooks/product/query/useGetProducts';
import useGetCategories from '@hooks/product/query/useGetCategories';

export default function ProductListPage() {
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotal] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('-1');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(
    FILTER_LIST[0].value,
  );
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const debouncedKeyword = useDebounce<string>(searchKeyword);

  const { products } = useGetProducts({
    activePage,
    selectedCategory,
    selectedFilter,
    debouncedKeyword,
  });
  const { categoryList } = useGetCategories();

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
  }, [fetchProductsCount]);

  const onSelectCategory = useCallback((selectedCategory: string) => {
    setSelectedCategory(selectedCategory);
    setActivePage(1);
  }, []);

  const onChangeSearchKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchKeyword(e.target.value);
    },
    [],
  );

  return (
    <div className="p-36">
      <SearchInput value={searchKeyword} onChange={onChangeSearchKeyword} />
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
