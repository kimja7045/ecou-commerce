import Head from 'next/head';
import Image from 'next/image';
import Carousel from 'nuka-carousel';
import { useEffect, useState } from 'react';
import ProductAPI from '@/api/product';
import { GetServerSidePropsContext } from 'next';
import { products } from '@prisma/client';
import { format } from 'date-fns';
import { CATEGORY_MAP } from '@/constants/products';

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
        <meta property="og:url" content="사이트 주소" />
        <meta property="og:type" content="product" />
        {/* <meta property="og:type" content="website" /> */}
        <meta property="og:title" content="3만원 무슨상품" />
        <meta name="description" content="사이트 설명" />
        <meta name="keyword" content="사이트 키워드" />
        <meta property="og:description" content="사이트 설명" />
        <meta property="og:image" content="썸네일주소" />
      </Head>

      <div className="p-24 flex flex-row">
        <div style={{ maxWidth: 600, marginRight: 52 }}>
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
                layout="responsive"
              />
            ))}
          </Carousel>
          <div className="flex space-x-4 mt-2">
            {product.images.map((url, idx) => (
              <div key={`url-thumb-${idx}`} onClick={() => setIndex(idx)}>
                <Image src={url} alt="image" width={100} height={100} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: 600 }} className="flex flex-col space-y-6">
          <div className="text-lg text-zinc-400">
            {CATEGORY_MAP[product.category_id - 1]}
          </div>
          <div className="text-4lg font-semibold">{product.name}</div>
          <div className="text-lg">
            {product.price.toLocaleString('ko-kr')}원
          </div>
          <div className="text-sm text-zinc-300">
            등록: {format(new Date(product.createdAt), 'yyyy년 M월 d일')}
          </div>
        </div>
        {/* {editorState && (
        <CustomEditor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          readOnly
        />
      )} */}
      </div>
    </>
  );
}
