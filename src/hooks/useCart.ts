import { useEffect } from 'react'

import { useSelector } from 'react-redux'

import { useAppDispatch } from '@/store'
import {
  cartLoadingStatusSelector,
  cartSelector,
  getCart,
} from '@/store/cartSlice'

export const useCart = () => {
  const dispatch = useAppDispatch()
  const cart = useSelector(cartSelector)
  const cartLoadingStatus = useSelector(cartLoadingStatusSelector)

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  const isCartLoading = cartLoadingStatus === 'loading'

  return { cartItemsCount: cart.length, isCartLoading }
}
