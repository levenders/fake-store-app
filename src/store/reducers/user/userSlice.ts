import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { loginUser, registerUser } from './actionCreators'

type UserState = {
  email: string | null
  id: string | null
  error: string | null
}

const initialState: UserState = {
  email: null,
  id: null,
  error: null,
}

const loadUserFromLocalStorage = (): UserState => {
  const user = localStorage.getItem('user')
  if (user) {
    return JSON.parse(user)
  }
  return initialState
}

const setUserToLocalStorage = (user: UserState) => {
  localStorage.setItem('user', JSON.stringify(user))
}

const removeUserIntoLocalStorage = () => {
  localStorage.removeItem('user')
}

const userSlice = createSlice({
  name: 'user',
  initialState: loadUserFromLocalStorage(),
  reducers: {
    removeUser(state) {
      state.email = null
      state.id = null
      state.error = null
      removeUserIntoLocalStorage()
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{ email: string | null; uid: string | null }>,
        ) => {
          state.email = action.payload.email
          state.id = action.payload.uid
          setUserToLocalStorage(state)
        },
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string
      })
      .addCase(
        registerUser.fulfilled,
        (
          state,
          action: PayloadAction<{ email: string | null; uid: string | null }>,
        ) => {
          state.email = action.payload.email
          state.id = action.payload.uid
          setUserToLocalStorage(state)
        },
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string
      })
  },
})

export const { removeUser } = userSlice.actions

export default userSlice.reducer
