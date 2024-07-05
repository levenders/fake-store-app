import { createListenerMiddleware } from '@reduxjs/toolkit'
import { loginUser, registerUser, removeUser } from '@store/reducers'

export const localStorageMiddleware = createListenerMiddleware()

localStorageMiddleware.startListening({
  actionCreator: loginUser.fulfilled,
  effect: action => {
    const { email, uid } = action.payload
    localStorage.setItem('user', JSON.stringify({ email, uid }))
  },
})

localStorageMiddleware.startListening({
  actionCreator: registerUser.fulfilled,
  effect: action => {
    const { email, uid } = action.payload
    localStorage.setItem('user', JSON.stringify({ email, uid }))
  },
})

localStorageMiddleware.startListening({
  actionCreator: removeUser,
  effect: () => {
    localStorage.removeItem('user')
  },
})
