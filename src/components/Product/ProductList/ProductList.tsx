import React from 'react';
import { IProduct } from '@/types/product';
import ProductItem from './ProductItem';

type ProductListProps = {
  products: IProduct[];
};

export const ProductList = ({ products }: ProductListProps) => {
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
