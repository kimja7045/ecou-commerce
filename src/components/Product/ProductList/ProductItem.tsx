import React from 'react';
import Image from 'next/image';
import { IProduct } from '@/types/product';
import { CATEGORY_MAP } from '@/constants/products';

const ProductItem = ({ name, image_url, price, category_id }: IProduct) => {
  return (
    <div className="max-w-xs">
      <Image
        className="rounded"
        src={image_url ?? ''}
        alt={name}
        width={320}
        height={390}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8p6NTDwAEnQGnwx5bWgAAAABJRU5ErkJggg=="
      />
      <div className="flex mt-2">
        <span>{name}</span>
        <span className="ml-auto">{price.toLocaleString('ko-KR')}원</span>
      </div>
      <span className="text-zinc-400">{CATEGORY_MAP[category_id - 1]}</span>
    </div>
  );
};

export default ProductItem;
