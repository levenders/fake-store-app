import { useEffect } from 'react'

import { useSelector } from 'react-redux'

import { checkAuthState, userSelector } from '@/store/userSlice'
import { useAppDispatch } from '@/store'

export const useAuth = () => {
  const user = useSelector(userSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(checkAuthState())
  }, [dispatch])

  return { isAuth: Boolean(user) }
}
