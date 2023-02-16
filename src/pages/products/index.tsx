import { useState, useCallback, useEffect } from 'react';
import { getProducts } from '@/api/product';
import { IProduct } from '@/types/product';
import { ProductList } from '@/components/Product/ProductList/ProductList';
import { TAKE_PRODUCT_COUNT } from '@/constants/products';

export default function ProductListPage() {
  const [skip, setSkip] = useState(0);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = useCallback(async () => {
    const newProducts = await getProducts({ skip, take: TAKE_PRODUCT_COUNT });
    setProducts(products.concat(newProducts));

    const next = skip + TAKE_PRODUCT_COUNT;
    setSkip(next);
  }, [skip, products]);

  return <ProductList products={products} onClickMoreBtn={fetchProducts} />;
}
