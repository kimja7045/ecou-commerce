import React, { useState } from 'react';
import { Cart } from '@/types/product';
import Image from 'next/image';
import { CountControl } from '../Common/CountControl';

const CartItem = ({ name, price, imageUrl, quantity }: Cart) => {
  const [itemCount, setItemCount] = useState<number | undefined>(quantity);

  return (
    <div className="w-full flex p-4 border-b">
      <Image src={imageUrl} alt={name} width={155} height={195} />
      <div className="flex flex-col ml-4">
        <span className="font-semibold mb-2">{name}</span>
        <span className="mb-auto">
          가격: {price.toLocaleString('ko-kr')} 원
        </span>
        <CountControl value={itemCount} setValue={setItemCount} max={20} />
      </div>
    </div>
  );
};

export default CartItem;
