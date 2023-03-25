import Image from 'next/image';
import { useSession } from 'next-auth/react';
import {
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai';
import { useRouter } from 'next/router';

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="mt-12 mb-12">
      <div className="w-full flex h-50 items-center">
        <AiOutlineHome onClick={() => router.push('/')} />
        <span className="m-auto" />
        <AiOutlineShoppingCart
          className="mr-4"
          onClick={() => router.push('/cart')}
        />
        {session ? (
          <Image
            src={session.user?.image!}
            alt="profile"
            width={30}
            height={30}
            style={{ borderRadius: '50%' }}
            onClick={() => router.push('/myPage')}
          />
        ) : (
          <AiOutlineUser onClick={() => router.push('/auth/login')} />
        )}
      </div>
    </div>
  );
};

export default Header;
