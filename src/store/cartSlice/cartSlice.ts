import { createSlice } from '@reduxjs/toolkit'

import type { CartItem, LoadingStatus } from '@/types'
import {
  addToCart,
  clearCart,
  decrementCartItem,
  getCart,
  removeCartItem,
} from './actionCreators'

type CartState = {
  cart: CartItem[]
  loadingStatus: LoadingStatus
  errorMessage: string | null
}

const initialState: CartState = {
  cart: [],
  loadingStatus: 'idle',
  errorMessage: null,
}

const updateItemLoadingState = (
  state: CartState,
  itemId: number,
  isLoading: boolean,
) => {
  const item = state.cart.find(item => item.id === itemId)
  if (item) {
    item.isLoading = isLoading
  }
}

type State = typeof initialState

interface RootState {
  cartSlice: State
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addToCart.pending, (state, action) => {
        state.loadingStatus = 'loading'
        state.errorMessage = null
        updateItemLoadingState(state, action.meta.arg.id, true)
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loadingStatus = 'idle'
        const existingItem = state.cart.find(
          item => item.id === action.payload.id,
        )
        if (existingItem) {
          existingItem.count += action.payload.count
          existingItem.isLoading = false
        } else {
          state.cart.push({ ...action.payload, isLoading: false })
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loadingStatus = 'error'
        state.errorMessage = action.error.message || 'Неизвестная ошибка'
        updateItemLoadingState(state, action.meta.arg.id, false)
      })
      .addCase(getCart.pending, state => {
        state.loadingStatus = 'loading'
        state.errorMessage = null
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loadingStatus = 'idle'
        state.cart = action.payload
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loadingStatus = 'error'
        state.errorMessage = action.error.message || 'Неизвестная ошибка'
      })
      .addCase(decrementCartItem.pending, (state, action) => {
        state.loadingStatus = 'loading'
        state.errorMessage = null
        updateItemLoadingState(state, action.meta.arg, true)
      })
      .addCase(decrementCartItem.fulfilled, (state, action) => {
        state.loadingStatus = 'idle'
        const existingItem = state.cart.find(
          item => item.id === action.payload.id,
        )
        if (existingItem) {
          if (action.payload.count === 0) {
            state.cart = state.cart.filter(
              item => item.id !== action.payload.id,
            )
          } else {
            existingItem.count = action.payload.count
          }
          existingItem.isLoading = false
        }
      })
      .addCase(decrementCartItem.rejected, (state, action) => {
        state.loadingStatus = 'error'
        state.errorMessage = action.error.message || 'Неизвестная ошибка'
        updateItemLoadingState(state, action.meta.arg, false)
      })
      .addCase(removeCartItem.pending, (state, action) => {
        state.loadingStatus = 'loading'
        state.errorMessage = null
        updateItemLoadingState(state, action.meta.arg, true)
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loadingStatus = 'idle'
        state.cart = state.cart.filter(item => item.id !== action.payload)
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loadingStatus = 'error'
        state.errorMessage = action.error.message || 'Неизвестная ошибка'
        updateItemLoadingState(state, action.meta.arg, false)
      })
      .addCase(clearCart.pending, state => {
        state.loadingStatus = 'loading'
        state.errorMessage = null
        state.cart.forEach(item => {
          item.isLoading = true
        })
      })
      .addCase(clearCart.fulfilled, state => {
        state.loadingStatus = 'idle'
        state.cart = []
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loadingStatus = 'error'
        state.errorMessage = action.error.message || 'Неизвестная ошибка'
        state.cart.forEach(item => {
          item.isLoading = false
        })
      })
  },
})

export const cartSelector = (state: RootState) => state.cartSlice.cart

export const cartLoadingStatusSelector = (state: RootState) =>
  state.cartSlice.loadingStatus

export const cartItemLoadingSelector = (id: number) => (state: RootState) => {
  const item = state.cartSlice.cart.find(item => item.id === id)
  return item ? item.isLoading : false
}
