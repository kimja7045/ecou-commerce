import React from 'react';
import { Cart } from '@/types/product';
import Image from 'next/image';
import { CountControl } from '@/components/Common/CountControl';
import { HiOutlineRefresh } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';

interface CartItemViewProps {
  cart: Cart;
  totalPrice: number;
  handleDelete: () => void;
  itemCount: number | undefined;
  onChangeItemCount: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const CartItemView = ({
  cart,
  totalPrice,
  handleDelete,
  itemCount,
  onChangeItemCount,
}: CartItemViewProps) => {
  const { name, price, imageUrl } = cart;

  return (
    <div className="w-full flex p-4 border-b">
      <Image src={imageUrl} alt={name} width={155} height={195} />
      <div className="flex flex-col ml-4">
        <span className="font-semibold mb-2">{name}</span>
        <span className="mb-auto">
          가격: {price.toLocaleString('ko-kr')} 원
        </span>
        <div className="flex items-center space-x-4">
          <CountControl
            value={itemCount}
            setValue={onChangeItemCount}
            max={20}
          />
          <HiOutlineRefresh />
        </div>
      </div>
      <div className="flex items-start ml-auto space-x-4">
        <span>{totalPrice.toLocaleString('ko-kr')} 원</span>
        <IoClose onClick={handleDelete} className="cursor-pointer" size={24} />
      </div>
    </div>
  );
};

export default CartItemView;
