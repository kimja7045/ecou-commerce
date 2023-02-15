import React from 'react';
import Image from 'next/image';
import { IProduct } from '../../../types/product.d';

const ProductItem = ({ id, image_url, name, price, category_id }: IProduct) => {
  return (
    <div key={id}>
      <Image
        className="rounded"
        src={image_url ?? ''}
        alt={name}
        width={300}
        height={200}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8p6NTDwAEnQGnwx5bWgAAAABJRU5ErkJggg=="
      />
      <div className="flex">
        <span>{name}</span>
        <span className="ml-auto">{price.toLocaleString('ko-KR')}원</span>
      </div>
      <span className="text-zinc-400">
        {category_id === 1 ? '의류' : '기타'}
      </span>
    </div>
  );
};

export default ProductItem;
