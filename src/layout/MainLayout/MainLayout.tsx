import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Loader } from '@/components'
import { useAuth } from '@/hooks/useAuth'
import { userLoadingStatusSelector } from '@/store/userSlice'
import { Header } from '@/layout/MainLayout/components'
import { ROUTES } from '@/constants/routes'

interface Props {
  isHeaderVisible?: boolean
}

export const MainLayout = ({ isHeaderVisible = false }: Props) => {
  const { pathname } = useLocation()

  const loadingStatus = useSelector(userLoadingStatusSelector)

  const { isAuth } = useAuth()

  const isAuthPage = pathname === ROUTES.LOGIN || pathname === ROUTES.REGISTER

  if (loadingStatus === 'loading') return <Loader />

  if (!isAuth && !isAuthPage) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  if (isAuth && isAuthPage) {
    return <Navigate to={ROUTES.HOME} replace />
  }

  return (
    <>
      {isHeaderVisible && <Header />}
      <Outlet />
    </>
  )
}
