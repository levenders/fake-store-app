import { useEffect } from 'react'

import { useSelector } from 'react-redux'

import {
  checkAuthState,
  userLoadingStatusSelector,
  userSelector,
} from '@/store/userSlice'
import { useAppDispatch } from '@/store'

export const useAuth = () => {
  const user = useSelector(userSelector)
  const isLoadingStatus = useSelector(userLoadingStatusSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(checkAuthState())
  }, [dispatch])

  const isLoading = isLoadingStatus === 'loading' || isLoadingStatus === 'idle'
  const isAuth = Boolean(user) && !isLoading

  return { isAuth, isLoading }
}
