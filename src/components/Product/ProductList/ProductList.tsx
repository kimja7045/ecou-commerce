import React from 'react';
import Image from 'next/image';
import { IProduct } from '@/types/product';

type ProductListProps = {
  products: IProduct[];
  onClickMoreBtn: React.MouseEventHandler<HTMLButtonElement>;
};

export const ProductList = ({ products, onClickMoreBtn }: ProductListProps) => {
  return (
    <div className="px-36 my-36">
      {products && (
        <div className="grid grid-cols-3 gap-5">
          {products.map(
            (pd, i) =>
              i < 9 && (
                <div key={pd.id}>
                  <Image
                    className="rounded"
                    src={pd.image_url ?? ''}
                    alt={pd.name}
                    width={300}
                    height={200}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8p6NTDwAEnQGnwx5bWgAAAABJRU5ErkJggg=="
                  />
                  <div className="flex">
                    <span>{pd.name}</span>
                    <span className="ml-auto">
                      {pd.price.toLocaleString('ko-KR')}원
                    </span>
                  </div>
                  <span className="text-zinc-400">
                    {pd.category_id === 1 ? '의류' : '기타'}
                  </span>
                </div>
              ),
          )}
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
