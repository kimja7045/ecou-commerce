import { useSession, signIn, signOut } from 'next-auth/react';
import Button from '../Common/Button';
export default function GoogleLoginBtn() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div>
      <p>Not signed in</p>
      <Button onClick={() => signIn()}>Sign in</Button>
    </div>
  );
}
