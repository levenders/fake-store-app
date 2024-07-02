import React from 'react'

import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { createRoot } from 'react-dom/client'

import App from './App'
import { store } from './store'

import './index.css'

const container = document.getElementById('root')

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
])

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
