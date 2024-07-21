import { Navigate, Outlet } from 'react-router-dom'

import { Loader } from '@/components'
import { useAuth } from '@/hooks/useAuth'

import { ROUTES } from '@/constants/routes'

export const AuthLayout = () => {
  const { isAuth, isLoading } = useAuth()

  if (isLoading) return <Loader />

  if (isAuth && !isLoading) return <Navigate to={ROUTES.HOME} replace />

  return <Outlet />
}
