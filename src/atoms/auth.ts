import { atom } from 'recoil';
import { IUser } from '../types/user';

interface AuthState {
  user: IUser | null;
}

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    user: null,
  },
});
