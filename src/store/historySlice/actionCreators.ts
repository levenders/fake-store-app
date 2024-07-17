import { createAsyncThunk } from '@reduxjs/toolkit'
import { arrayUnion, getDoc, setDoc, updateDoc } from 'firebase/firestore'

import { getCurrentUser } from '@/helpers/getCurrentUser'
import { getHistoryRef } from '@/helpers/getRef'

export const getHistory = createAsyncThunk(
  'history/getHistory',
  async (_, thunkAPI) => {
    try {
      const user = getCurrentUser()
      const historyRef = getHistoryRef(user.uid)
      const historyDoc = await getDoc(historyRef)

      if (!historyDoc.exists()) {
        return []
      }

      return historyDoc.data().history
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
      throw error
    }
  },
)

export const addToHistory = createAsyncThunk(
  'history/addToHistory',
  async (query: string, thunkAPI) => {
    try {
      const user = getCurrentUser()
      const historyRef = getHistoryRef(user.uid)
      const historyDoc = await getDoc(historyRef)

      if (!historyDoc.exists()) {
        await setDoc(historyRef, { history: [query] })
        return query
      }

      const historyData = historyDoc.data().history
      if (!historyData.includes(query)) {
        await updateDoc(historyRef, { history: arrayUnion(query) })
      }

      return query
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
      throw error
    }
  },
)

export const removeHistoryItem = createAsyncThunk(
  'history/removeHistoryItem',
  async (query: string, thunkAPI) => {
    try {
      const user = getCurrentUser()
      const historyRef = getHistoryRef(user.uid)
      const historyDoc = await getDoc(historyRef)

      if (!historyDoc.exists()) {
        return thunkAPI.rejectWithValue('Item not found in history')
      }

      const historyData = historyDoc.data().history
      const existingItem = historyData.find((item: string) => item === query)
      if (existingItem) {
        const updatedHistory = historyData.filter(
          (item: string) => item !== query,
        )
        await updateDoc(historyRef, { history: updatedHistory })
        return query
      }
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
      throw error
    }
  },
)

export const clearHistory = createAsyncThunk(
  'history/clearHistory',
  async (_, thunkAPI) => {
    try {
      const user = getCurrentUser()
      const historyRef = getHistoryRef(user.uid)
      await updateDoc(historyRef, { history: [] })
      return []
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
      throw error
    }
  },
)
