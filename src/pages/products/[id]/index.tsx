import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ProductAPI from '@/api/product';
import { GetServerSidePropsContext } from 'next';
import { products } from '@prisma/client';
import { format } from 'date-fns';
import { CATEGORY_MAP } from '@/constants/products';
import styled from '@emotion/styled';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const productId = context.params?.id;
  const product = await ProductAPI.getProduct(Number(productId));
  return {
    props: {
      product: { ...product, images: [product.image_url, product.image_url] },
    },
  };
}

export default function ProductDetailPage(props: {
  product: products & { images: string[] };
}) {
  const [index, setIndex] = useState(0);
  // const [editorState, setEditorState] = useState<EditorState | undefined>();

  const product = props.product;

  useEffect(() => {
    // if (props.product?.contents) {
    //   setEditorState(
    //     EditorState.createWithContent(
    //       convertFromRaw(JSON.parse(props.product.contents)),
    //     ),
    //   );
    // } else {
    //   setEditorState(EditorState.createEmpty());
    // }
  }, []);

  return (
    <>
      <Head>
        <meta property="og:title" content={product.name} />
        <meta name="keyword" content={product.name} />
        <meta property="og:type" content="product" />
        <meta
          property="og:url"
          content={`${process?.env?.NEXT_PUBLIC_BASE_URL}/products/${product.id}`}
        />
        <meta name="description" content={product.contents || ''} />
        <meta property="og:description" content={product.contents || ''} />
        <meta property="og:image" content={product.image_url || ''} />
      </Head>

      <Wrapper>
        <div className="min-w-[300px]">
          {product?.images.length > 0 && (
            <Image
              src={product.images[index]}
              width={300}
              height={300}
              alt="product_thumbnail"
              style={{ background: 'blue' }}
            />
          )}
          {/* {product?.images?.length > 0 && (
            <Carousel
              autoplay
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
                onClick={() => setIndex(idx)}
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
          <div className="text-lg">
            {product.price.toLocaleString('ko-kr')}원
          </div>
          <div className="text-sm text-zinc-300">
            등록: {format(new Date(product.createdAt), 'yyyy년 M월 d일')}
          </div>
        </ProductInfoWrapper>
        {/* {editorState && (
        <CustomEditor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          readOnly
        />
      )} */}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 6rem;

  @media screen and (max-width: 375px) {
    flex-direction: column;
    padding: 0;
  }
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3rem;

  @media screen and (max-width: 375px) {
    margin: 1rem 0;
  }
`;
