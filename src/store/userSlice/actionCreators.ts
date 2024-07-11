import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { auth } from '@/config/firebase'

export const loginUser = createAsyncThunk(
  'user/login',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI,
  ) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      const { user } = response
      return { email: user.email, uid: user.uid }
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
      throw error
    }
  },
)

export const registerUser = createAsyncThunk(
  'user/register',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI,
  ) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      const { user } = response
      return { email: user.email, uid: user.uid }
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
      throw error
    }
  },
)

export const checkAuthState = createAsyncThunk(
  'user/checkAuthState',
  async (_, thunkAPI) => {
    try {
      return new Promise<{ email: string | null; uid: string } | null>(
        resolve => {
          const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
              resolve({
                email: user.email,
                uid: user.uid,
              })
            } else {
              resolve(null)
            }
            unsubscribe()
          })
        },
      )
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
      throw error
    }
  },
)

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => {
    try {
      await auth.signOut()
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
      throw error
    }
  },
)
