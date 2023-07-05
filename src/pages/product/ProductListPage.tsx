import { useState, useCallback } from 'react';
import { ProductListView } from '@/components/product/ProductList/ProductListView';
import { FILTER_LIST } from '@/constants/products';
import CategoryList from '@/components/product/ProductList/CategoryList';
import PaginationList from '@/components/product/ProductList/PaginationList';
import ListSelect from '@/components/product/ProductList/ListSelect';
import SearchInput from '@/components/product/ProductList/SearchInput';
import useDebounce from '@/hooks/common/useDebounce';
import {
  useGetCategories,
  useGetProducts,
  useGetTotalPage,
} from '@/api/product/query';

export default function ProductListPage() {
  const [activePage, setActivePage] = useState<number>(1);
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
  const { totalPage } = useGetTotalPage({
    selectedCategory,
    debouncedKeyword,
  });

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
    <div>
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
      {!!totalPage && (
        <PaginationList
          activePage={activePage}
          setActivePage={setActivePage}
          totalPage={totalPage}
        />
      )}
    </div>
  );
}
