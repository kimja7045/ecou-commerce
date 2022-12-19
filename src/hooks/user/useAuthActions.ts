import { useMemo } from 'react'
import { useSetRecoilState } from 'recoil'
import { authState } from '@atoms/auth'
import { IUser } from '@apis/types/user.type'

export default function UseAuthActions() {
  const set = useSetRecoilState(authState)

  return useMemo(
    () => ({
      authorize: (user: IUser) => {
        set({ user })
      },
      logout: () => {
        set({ user: null })
      },
    }),
    [set]
  )
}
