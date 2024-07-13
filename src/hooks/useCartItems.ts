import { useEffect } from 'react'

import { useSelector } from 'react-redux'

import { useAppDispatch } from '@/store'
import { cartSelector, getCart } from '@/store/cartSlice'

export const useCartItems = (id?: number) => {
  const dispatch = useAppDispatch()
  const cart = useSelector(cartSelector)

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  const getItemCountById = (id: number | undefined): number => {
    if (id === undefined) {
      return 0
    }
    const item = cart.find(i => i.id === id)
    return item ? item.count : 0
  }

  return {
    cartItems: cart.length,
    countById: getItemCountById(id),
  }
}
