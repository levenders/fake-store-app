import {
  createRoutesFromElements,
  createHashRouter,
  Route,
} from 'react-router-dom'

import {
  HomePage,
  LoginPage,
  ProductPage,
  RegisterPage,
  CartPage,
  HistoryPage,
  SearchPage,
} from '@/pages'
import { MainLayout } from '@/layout/MainLayout'
import { ROUTES } from '@/constants/routes'

const routes = createRoutesFromElements(
  <>
    <Route path={ROUTES.HOME} element={<MainLayout isHeaderVisible />}>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.PRODUCT} element={<ProductPage />} />
      <Route path={ROUTES.CART} element={<CartPage />} />
      <Route path={ROUTES.HISTORY} element={<HistoryPage />} />
      <Route path={ROUTES.SEARCH} element={<SearchPage />} />
    </Route>

    <Route path={ROUTES.AUTH} element={<MainLayout />}>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
    </Route>
  </>,
)

export const router = createHashRouter(routes)
