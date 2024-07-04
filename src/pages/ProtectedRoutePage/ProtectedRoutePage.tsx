import { type ReactNode, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/hooks'

export const ProtectedRoutePage = ({ children }: { children: ReactNode }) => {
  const { isAuth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) {
      navigate('/login', { replace: true })
    }
  }, [isAuth, navigate])

  return <>{children}</>
}
