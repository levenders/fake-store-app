import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Loader } from '@/components'
import { useAuth } from '@/hooks/useAuth'
import { Header } from '@/layout/MainLayout/components'
import { ROUTES } from '@/constants/routes'

export const MainLayout = () => {
  const { pathname } = useLocation()

  const { isAuth, isLoading } = useAuth()

  const isProtectedPage =
    pathname === ROUTES.CART || pathname === ROUTES.HISTORY

  if (isLoading) return <Loader />

  if (!isAuth && isProtectedPage) return <Navigate to={ROUTES.LOGIN} replace />

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
