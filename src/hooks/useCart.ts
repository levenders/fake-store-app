import { useEffect, useState } from 'react'

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

  const [isCartLodingStatus, setIsCartLodingStatus] = useState(false)

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  useEffect(() => {
    if (cartLoadingStatus === 'loading') {
      setIsCartLodingStatus(true)
    } else {
      setIsCartLodingStatus(false)
    }
  }, [cartLoadingStatus])

  return { cartItemsCount: cart.length, isCartLoading: isCartLodingStatus }
}
