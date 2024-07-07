import { createBrowserRouter } from 'react-router-dom'

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
      <ProtectedRoutePage>
        <Header />
      </ProtectedRoutePage>
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
