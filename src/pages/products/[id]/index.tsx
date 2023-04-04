import CustomEditor from '@/components/Product/ProductDetail/Editor';
import Head from 'next/head';
import Image from 'next/image';
import Carousel from 'nuka-carousel';
import { useEffect, useState } from 'react';
import { EditorState } from 'react-draft-wysiwyg';
import ProductAPI from '@/api/product';
import { GetServerSidePropsContext } from 'next';
import { products } from '@prisma/client';

const CAROUSEL_IMAGES = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

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
  const [editorState, setEditorState] = useState<EditorState | undefined>();

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

      <Carousel
        autoplay
        speed={10}
        slideIndex={index}
        wrapAround
        withoutControls
        slidesToShow={3}
        animation="zoom"
      >
        {product.images.map((url) => (
          <Image key={url} src={url} alt="image" width={1000} height={600} />
        ))}
      </Carousel>

      <div className="flex">
        {product.images.map((url, idx) => (
          <div key={idx} onClick={() => setIndex(idx)}>
            <Image src={url} alt="image" width={100} height={60} />
          </div>
        ))}
      </div>
      {editorState && (
        <CustomEditor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          readOnly
        />
      )}
    </>
  );
}
