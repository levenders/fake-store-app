import { createBrowserRouter } from 'react-router-dom'

import { ErrorBoundary } from 'react-error-boundary'

import { Error } from '@/components'
import { Header } from '@/layout'
import {
  HomePage,
  LoginPage,
  ProductPage,
  ProtectedRoutePage,
  RegisterPage,
} from '@/pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary fallback={<Error />}>
        <ProtectedRoutePage>
          <Header />
        </ProtectedRoutePage>
      </ErrorBoundary>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/product/:id',
        element: <ProductPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
])
