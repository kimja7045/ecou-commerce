import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useCallback, useState } from 'react';
import ProductAPI from '@/api/product/product';
import { products } from '@prisma/client';
import { useGetWishList } from '@/api/product/query';
import ProductDetailView from '@/components/Product/ProductDetail/ProductDetailView';
import useToggleWishList from '@/api/product/mutate/useToggleWishList';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const productId = context.params?.id;
  const product = await ProductAPI.getProduct(Number(productId));
  return {
    props: {
      product: { ...product, images: [product.image_url, product.image_url] },
    },
  };
}

export type CartType = 'cart' | 'order';

export default function ProductDetailPage(props: {
  product: products & { images: string[] };
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [imageIndex, setImageIndex] = useState(0);

  const product = props.product;

  const { wishList } = useGetWishList();
  const isWished = wishList.includes(String(product?.id));
  const { toggleProductWish } = useToggleWishList(String(product.id));

  const onClickImage = useCallback((imageIdx: number) => {
    setImageIndex(imageIdx);
  }, []);

  const toggleWished = useCallback(() => {
    if (!session) {
      alert('로그인이 필요합니다.');
      router.push('/auth/login');
      return;
    }

    toggleProductWish();
  }, [toggleProductWish, router, session]);

  const checkCartValidate = useCallback(
    (type: CartType) => {
      // if (!session) {
      //   alert('로그인이 필요합니다.');
      //   router.push('/auth/login');
      //   return;
      // }

      console.log(type);

      // TODO: 장바구니에 등록하는 로직 추가
      router.push('/cart');
    },
    [router],
  );

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
        onClickImage={(imageIdx: number) => onClickImage(imageIdx)}
        onToggleWished={toggleWished}
        validate={(type: CartType) => checkCartValidate(type)}
      />
    </>
  );
}
