import Head from 'next/head';
import { useCallback, useState } from 'react';
import ProductAPI from '@/api/product';
import { GetServerSidePropsContext } from 'next';
import { products } from '@prisma/client';
import useGetWishList from '@hooks/product/query/useGetWishList';
import ProductDetailView from '@components/Product/ProductDetail/ProductDetailView';

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
  const [imageIndex, setImageIndex] = useState(0);

  const product = props.product;
  const { wishList } = useGetWishList();
  const isWished = wishList.includes(String(product?.id));

  const onClickImage = useCallback((imageIdx: number) => {
    setImageIndex(imageIdx);
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

      <ProductDetailView
        product={product}
        isWished={isWished}
        imageIndex={imageIndex}
        onClickImage={(imageIdx) => onClickImage(imageIdx)}
      />
    </>
  );
}
