import React, { useCallback } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { CATEGORY_MAP } from '@/constants/products';
import { useRouter } from 'next/router';

const ProductItem = ({ id, name, image_url, price, category_id }: Product) => {
  const router = useRouter();

  const moveProductDetail = useCallback(() => {
    router.push(`/products/${id}`);
  }, [id, router]);

  return (
    <div className="cursor-pointer" onClick={moveProductDetail}>
      <Image
        className="rounded"
        src={image_url ?? ''}
        alt={name}
        width={480}
        height={400}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNUUVGoBwABxQDpDqiIWwAAAABJRU5ErkJggg=="
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
