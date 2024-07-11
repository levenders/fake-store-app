import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import { Error } from '@/components'
import { router } from '@/router'
import { store } from '@/store'
import '@/config/firebase'

import './global.css'

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<Error />}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
)
