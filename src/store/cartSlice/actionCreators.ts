import { createAsyncThunk } from '@reduxjs/toolkit'
import { arrayUnion, getDoc, setDoc, updateDoc } from 'firebase/firestore'

import { getCartRef } from '@/helpers/getRef'
import { getCurrentUser } from '@/helpers/getCurrentUser'
import type { CartItem } from '@/types/cart'

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (product: CartItem, thunkAPI) => {
    try {
      const user = getCurrentUser()
      const cartRef = getCartRef(user.uid)
      const cartDoc = await getDoc(cartRef)

      if (!cartDoc.exists()) {
        await setDoc(cartRef, { cart: [product] })
        return product
      }

      const cartData = cartDoc.data().cart
      const existingItem = cartData.find(
        (cartItem: { id: number }) => cartItem.id === product.id,
      )

      if (existingItem) {
        const updatedCart = cartData.map(
          (cartItem: { id: number; count: number }) =>
            cartItem.id === product.id
              ? { ...cartItem, count: cartItem.count + product.count }
              : cartItem,
        )
        await updateDoc(cartRef, { cart: updatedCart })
      } else {
        await updateDoc(cartRef, { cart: arrayUnion(product) })
      }
      return product
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
      throw error
    }
  },
)

export const getCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, thunkAPI) => {
    try {
      const user = getCurrentUser()
      const cartRef = getCartRef(user.uid)
      const cartDoc = await getDoc(cartRef)
      if (!cartDoc.exists()) {
        return []
      }
      return cartDoc.data().cart
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
      throw error
    }
  },
)

export const decrementCartItem = createAsyncThunk(
  'cart/decrementCartItem',
  async (itemId: number, thunkAPI) => {
    try {
      const user = getCurrentUser()
      const cartRef = getCartRef(user.uid)
      const cartDoc = await getDoc(cartRef)

      if (cartDoc.exists()) {
        const cartData = cartDoc.data().cart
        const existingItem = cartData.find(
          (cartItem: { id: number }) => cartItem.id === itemId,
        )

        if (existingItem && existingItem.count > 1) {
          const updatedCart = cartData.map(
            (cartItem: { id: number; count: number }) =>
              cartItem.id === itemId
                ? { ...cartItem, count: cartItem.count - 1 }
                : cartItem,
          )
          await updateDoc(cartRef, { cart: updatedCart })
          return { id: itemId, count: existingItem.count - 1 }
        } else if (existingItem) {
          const updatedCart = cartData.filter(
            (cartItem: { id: number }) => cartItem.id !== itemId,
          )
          await updateDoc(cartRef, { cart: updatedCart })
          return { id: itemId, count: 0 }
        }
      }

      return thunkAPI.rejectWithValue('Item not found in cart')
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
      throw error
    }
  },
)

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (itemId: number, thunkAPI) => {
    try {
      const user = getCurrentUser()
      const cartRef = getCartRef(user.uid)
      const cartDoc = await getDoc(cartRef)

      if (cartDoc.exists()) {
        const cartData = cartDoc.data().cart
        const updatedCart = cartData.filter(
          (cartItem: { id: number }) => cartItem.id !== itemId,
        )
        await updateDoc(cartRef, { cart: updatedCart })
        return itemId
      }

      return thunkAPI.rejectWithValue('Item not found in cart')
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
      throw error
    }
  },
)

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, thunkAPI) => {
    try {
      const user = getCurrentUser()
      const cartRef = getCartRef(user.uid)
      await updateDoc(cartRef, { cart: [] })
      return []
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
      throw error
    }
  },
)
