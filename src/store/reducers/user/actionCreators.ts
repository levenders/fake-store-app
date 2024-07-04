import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { FormUserData } from '@/types/user'
import { auth } from '@/config'

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: FormUserData, thunkAPI) => {
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
  async ({ email, password }: FormUserData, thunkAPI) => {
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
