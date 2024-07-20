import { createListenerMiddleware } from '@reduxjs/toolkit'

import toast from 'react-hot-toast'

import { clearCart } from '@/store/cartSlice'

export const cartMiddleware = createListenerMiddleware()

cartMiddleware.startListening({
  actionCreator: clearCart.fulfilled,
  effect: () => {
    toast.success(`Заказ оформлен!`)
  },
})

cartMiddleware.startListening({
  actionCreator: clearCart.rejected,
  effect: action => {
    const errorMessage = action.payload || 'Произошла неизвестная ошибка'
    toast.error(`Ошибка при оформлении заказа: ${errorMessage}`)
  },
})
