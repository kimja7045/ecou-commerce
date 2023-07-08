import React from 'react';
import { Product } from '@/types/product';
import ProductItem from './ProductItemView';

type ProductListProps = {
  products: Product[];
};

export const ProductListView = ({ products }: ProductListProps) => {
  return products ? (
    <div className="grid grid-cols-3 gap-5">
      {products.map((pd) => (
        <ProductItem key={pd.id} {...pd} />
      ))}
    </div>
  ) : (
    <></>
  );
};
