import { createBrowserRouter } from 'react-router-dom'

import { HomePage, LoginPage, ProductPage, RegisterPage } from '@/pages'
import { MainLayout } from '@/layout/MainLayout'
import { ROUTES } from '@/constants/routes'

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <MainLayout isHeaderVisible />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTES.PRODUCT,
        element: <ProductPage />,
      },
    ],
  },

  {
    path: ROUTES.AUTH,
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.REGISTER,
        element: <RegisterPage />,
      },
    ],
  },
])
