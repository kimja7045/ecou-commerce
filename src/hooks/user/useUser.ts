import { useRecoilValue } from 'recoil'
import { authState } from '@atoms/auth'

export default function UseUser() {
  const auth = useRecoilValue(authState)
  return auth.user
}
