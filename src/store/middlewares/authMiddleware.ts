import { createListenerMiddleware } from '@reduxjs/toolkit'

import toast from 'react-hot-toast'

import { loginUser, registerUser, logoutUser } from '@/store/userSlice'

export const authMiddleware = createListenerMiddleware()

authMiddleware.startListening({
  actionCreator: loginUser.rejected,
  effect: action => {
    const errorMessage = action.payload || 'Произошла неизвестная ошибка'
    toast.error(` Ошибка входа: ${errorMessage}`)
  },
})

authMiddleware.startListening({
  actionCreator: registerUser.rejected,
  effect: action => {
    const errorMessage = action.payload || 'Произошла неизвестная ошибка'
    toast.error(`Ошибка регистрации: ${errorMessage}`)
  },
})

authMiddleware.startListening({
  actionCreator: logoutUser.fulfilled,
  effect: () => {
    toast.success(`До встречи`)
  },
})
