import { useDispatch } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'
import { productApi } from '@/services/productsService'
import { userSlice } from '@/store/userSlice'
import { cartSlice } from '@/store/cartSlice'
import { historySlice } from '@/store/historySlice'
import { authMiddleware } from '@store/middlewares'

export const store = configureStore({
  reducer: {
    userSlice: userSlice.reducer,
    cartSlice: cartSlice.reducer,
    historySlice: historySlice.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(authMiddleware.middleware),
})

export const useAppDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
