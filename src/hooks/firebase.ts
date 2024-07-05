import { useEffect, useState } from 'react'
import { useAppSelector } from '@/hooks'

export function useAuth() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('user'))
  const { id } = useAppSelector(state => state.user)

  useEffect(() => {
    if (id) {
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }
  }, [id, isAuth])

  return {
    isAuth,
  }
}
