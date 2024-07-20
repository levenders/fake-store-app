import { createSlice } from '@reduxjs/toolkit'

import {
  addToHistory,
  clearHistory,
  getHistory,
  removeHistoryItem,
} from '@/store/historySlice'

import type { LoadingStatus } from '@/types'

type historyState = {
  history: string[]
  loadingStatus: LoadingStatus
  errorMessage: string | null
}

const initialState: historyState = {
  history: [],
  loadingStatus: 'idle',
  errorMessage: null,
}

type State = typeof initialState

interface RootState {
  historySlice: State
}

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getHistory.pending, state => {
        state.loadingStatus = 'loading'
        state.errorMessage = null
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        state.history = action.payload
        state.loadingStatus = 'success'
      })
      .addCase(getHistory.rejected, (state, action) => {
        state.loadingStatus = 'error'
        state.errorMessage = action.error.message || 'Неизвестная ошибка'
      })
      .addCase(addToHistory.pending, state => {
        state.loadingStatus = 'loading'
        state.errorMessage = null
      })
      .addCase(addToHistory.fulfilled, (state, action) => {
        if (action.payload && !state.history.includes(action.payload)) {
          state.history.push(action.payload)
        }
        state.loadingStatus = 'success'
      })
      .addCase(addToHistory.rejected, (state, action) => {
        state.loadingStatus = 'error'
        state.errorMessage = action.error.message || 'Неизвестная ошибка'
      })
      .addCase(removeHistoryItem.pending, state => {
        state.loadingStatus = 'loading'
        state.errorMessage = null
      })
      .addCase(removeHistoryItem.fulfilled, (state, action) => {
        state.history = state.history.filter(item => item !== action.payload)
        state.loadingStatus = 'success'
      })
      .addCase(removeHistoryItem.rejected, (state, action) => {
        state.loadingStatus = 'error'
        state.errorMessage = action.error.message || 'Неизвестная ошибка'
      })
      .addCase(clearHistory.pending, state => {
        state.loadingStatus = 'loading'
        state.errorMessage = null
      })
      .addCase(clearHistory.fulfilled, state => {
        state.history = initialState.history
        state.loadingStatus = 'success'
      })
      .addCase(clearHistory.rejected, (state, action) => {
        state.loadingStatus = 'error'
        state.errorMessage = action.error.message || 'Неизвестная ошибка'
      })
  },
})

export const historySelector = (state: RootState) => state.historySlice.history

export const historyLoadingStatusSelector = (state: RootState) =>
  state.historySlice.loadingStatus
