import { atom } from 'recoil';
import { User } from '../types/user';

interface AuthState {
  user: User | null;
}

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    user: null,
  },
});
