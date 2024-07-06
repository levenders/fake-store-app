import { productApi } from '@/services'
import { configureStore } from '@reduxjs/toolkit'
import { localStorageMiddleware } from '@store/middlewares'
import userSlice from '@store/reducers/user/userSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    [productApi.reducerPath]: productApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(localStorageMiddleware.middleware)
      .concat(productApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
