import { useSession, signIn, signOut } from 'next-auth/react';
import Button from '@/components/Common/Button';

export default function GoogleLoginBtn() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>로그아웃</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <p>Not signed in</p>
      <Button onClick={() => signIn()}>로그인</Button>
    </div>
  );
}
