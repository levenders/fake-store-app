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
      .addCase(addToCart.pending, state => {
        state.loadingStatus = 'loading'
        state.errorMessage = null
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loadingStatus = 'idle'
        const existingItem = state.cart.find(
          item => item.id === action.payload.id,
        )
        if (existingItem) {
          existingItem.count += action.payload.count
        } else {
          state.cart.push(action.payload)
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loadingStatus = 'error'
        state.errorMessage = action.error.message || 'Неизвестная ошибка'
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
      .addCase(decrementCartItem.pending, state => {
        state.loadingStatus = 'loading'
        state.errorMessage = null
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
        }
      })
      .addCase(decrementCartItem.rejected, (state, action) => {
        state.loadingStatus = 'error'
        state.errorMessage = action.error.message || 'Неизвестная ошибка'
      })
      .addCase(removeCartItem.pending, state => {
        state.loadingStatus = 'loading'
        state.errorMessage = null
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loadingStatus = 'idle'
        state.cart = state.cart.filter(item => item.id !== action.payload)
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loadingStatus = 'error'
        state.errorMessage = action.error.message || 'Неизвестная ошибка'
      })
      .addCase(clearCart.pending, state => {
        state.loadingStatus = 'loading'
        state.errorMessage = null
      })
      .addCase(clearCart.fulfilled, state => {
        state.loadingStatus = 'idle'
        state.cart = []
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loadingStatus = 'error'
        state.errorMessage = action.error.message || 'Неизвестная ошибка'
      })
  },
})

export const cartSelector = (state: RootState) => state.cartSlice.cart

export const cartLoadingStatusSelector = (state: RootState) =>
  state.cartSlice.loadingStatus
