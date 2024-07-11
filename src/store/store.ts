import { useDispatch } from 'react-redux'

import { productApi } from '@/services/productsService'
import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '@/store/userSlice'

export const store = configureStore({
  reducer: {
    userSlice: userSlice.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(productApi.middleware),
})

export const useAppDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
