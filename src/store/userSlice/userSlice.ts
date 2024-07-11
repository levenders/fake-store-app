import { createSlice } from '@reduxjs/toolkit'
import {
  checkAuthState,
  loginUser,
  logoutUser,
  registerUser,
} from './actionCreators'
import type { LoadingStatus, User } from '@/types'

type UserState = {
  user: User | null
  loadingStatus: LoadingStatus
  errorMessage: string | null
}

const initialState: UserState = {
  user: null,
  loadingStatus: 'idle',
  errorMessage: null,
}

type State = typeof initialState

interface RootState {
  userSlice: State
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loadingStatus = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const user = {
          email: action.payload.email,
          uid: action.payload.uid,
        }

        state.user = user
        state.loadingStatus = 'success'
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Неизвестная ошибка'
        state.loadingStatus = 'error'
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const user = {
          email: action.payload.email,
          uid: action.payload.uid,
        }

        state.user = user
        state.loadingStatus = 'success'
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Неизвестная ошибка'
        state.loadingStatus = 'error'
      })
      .addCase(checkAuthState.pending, state => {
        state.loadingStatus = 'loading'
      })
      .addCase(checkAuthState.fulfilled, (state, action) => {
        const user = action.payload
          ? { email: action.payload.email, uid: action.payload.uid }
          : null
        state.user = user
        state.loadingStatus = 'success'
      })
      .addCase(checkAuthState.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Неизвестная ошибка'
        state.loadingStatus = 'error'
      })
      .addCase(logoutUser.pending, state => {
        state.loadingStatus = 'loading'
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = initialState.user
        state.loadingStatus = 'success'
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Неизвестная ошибка'
        state.loadingStatus = 'error'
      })
  },
})

export const userSelector = (state: RootState) => state.userSlice.user

export const userLoadingStatusSelector = (state: RootState) =>
  state.userSlice.loadingStatus
