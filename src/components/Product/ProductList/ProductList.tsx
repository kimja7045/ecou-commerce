import React from 'react';
import { IProduct } from '@/types/product';
import ProductItem from './ProductItem';

type ProductListProps = {
  products: IProduct[];
  onClickMoreBtn: React.MouseEventHandler<HTMLButtonElement>;
};

export const ProductList = ({ products, onClickMoreBtn }: ProductListProps) => {
  return (
    <div className="px-36 my-36">
      {products && (
        <div className="grid grid-cols-3 gap-5">
          {products.map((pd) => (
            <ProductItem key={pd.id} {...pd} />
          ))}
        </div>
      )}
      <button
        className="w-full rounded mt-20 bg-zinc-200 p-4"
        onClick={onClickMoreBtn}
      >
        더보기
      </button>
    </div>
  );
};
