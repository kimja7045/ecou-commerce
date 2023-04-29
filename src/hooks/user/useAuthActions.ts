import { useMemo } from 'react';
import { useSetRecoilState } from 'recoil';
import { authState } from '@atoms/auth';
import { User } from '@/types/user';

export default function UseAuthActions() {
  const set = useSetRecoilState(authState);

  return useMemo(
    () => ({
      authorize: (user: User) => {
        set({ user });
      },
      logout: () => {
        set({ user: null });
      },
    }),
    [set],
  );
}
