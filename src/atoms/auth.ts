import { atom } from 'recoil'
import { IUser } from '../api/types/user.type'

interface AuthState {
  user: IUser | null
}

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    user: null,
  },
})
