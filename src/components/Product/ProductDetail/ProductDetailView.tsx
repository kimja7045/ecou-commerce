import styled from '@emotion/styled';
import { Button } from '@mantine/core';
import { products } from '@prisma/client';
import { format } from 'date-fns';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { CATEGORY_MAP } from '@constants/products';
import Image from 'next/image';
import { CartType } from '@pages/products/[id]';
import { CountControl } from '../../Common/CountControl';
import { useState } from 'react';

interface ProductDetailViewProps {
  product: products & { images: string[] };
  isWished: boolean;
  imageIndex: number;
  onClickImage: (imageIdx: number) => void;
  onToggleWished: () => void;
  validate: (value: CartType) => void;
}

const ProductDetailView = ({
  product,
  isWished,
  imageIndex,
  onClickImage,
  onToggleWished,
  validate,
}: ProductDetailViewProps) => {
  const [productQuantity, setProductQuantity] = useState<number | undefined>(1);

  return (
    <Wrapper>
      <div className="min-w-[300px]">
        {product?.images.length > 0 && (
          <Image
            src={product.images[imageIndex]}
            width={300}
            height={300}
            alt="product_thumbnail"
            style={{ background: 'blue' }}
          />
        )}
        {/* {product?.images?.length > 0 && (
            <Carousel
              // autoplay
              speed={10}
              slideIndex={index}
              wrapAround
              withoutControls
              slidesToShow={3}
              animation="zoom"
            >
              {product.images.map((url, idx) => (
                <Image
                  key={`url-carousel-${idx}`}
                  src={url}
                  alt="image"
                  width={600}
                  height={600}
                />
              ))}
            </Carousel>
          )} */}
        <div className="flex space-x-4 mt-2">
          {product?.images.map((url, idx) => (
            <div
              key={`url-thumb-${idx}`}
              onClick={() => onClickImage(idx)}
              className="cursor-pointer"
            >
              <Image src={url} alt="image" width={100} height={100} />
            </div>
          ))}
        </div>
      </div>

      <ProductInfoWrapper className="space-y-2 min-w-[300px]">
        <div className="text-lg text-zinc-400">
          {CATEGORY_MAP[product.category_id - 1]}
        </div>
        <div className="font-semibold text-3xl">{product.name}</div>
        <div className="text-lg">{product.price.toLocaleString('ko-kr')}원</div>

        <div>
          <span className="text-lg">수량</span>
          <CountControl value={productQuantity} setValue={setProductQuantity} />
        </div>
        <Button
          onClick={() => validate('cart')}
          leftIcon={<AiOutlineShoppingCart />}
          style={{ backgroundColor: 'black' }}
          radius="xl"
          size="md"
        >
          장바구니
        </Button>
        <Button
          onClick={onToggleWished}
          leftIcon={isWished ? <AiFillHeart /> : <AiOutlineHeart />}
          style={{ backgroundColor: isWished ? 'red' : 'gray' }}
          radius="xl"
          size="md"
          // styles={{
          //   root: { paddingRight: 14, height: 48 },
          // }}
        >
          찜하기
        </Button>

        <div className="text-sm text-zinc-300">
          등록: {format(new Date(product.createdAt), 'yyyy년 M월 d일')}
        </div>
      </ProductInfoWrapper>
    </Wrapper>
  );
};

export default ProductDetailView;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 425px) {
    flex-direction: column;
    padding: 0;
  }
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3rem;

  @media screen and (max-width: 425px) {
    margin: 1rem 0;
  }
`;
