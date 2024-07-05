import { createBrowserRouter } from 'react-router-dom'

import { HomePage, LoginPage, ProtectedRoutePage, RegisterPage } from '@/pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoutePage>
        <HomePage />
      </ProtectedRoutePage>
    ),
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
