import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import { useAppDispatch } from '@/store'
import {
  cartLoadingStatusSelector,
  cartSelector,
  getCart,
} from '@/store/cartSlice'

export const useCartItems = (id?: number) => {
  const cartLoadingStatus = useSelector(cartLoadingStatusSelector)
  const dispatch = useAppDispatch()
  const cart = useSelector(cartSelector)

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
    isCartLoading: isCartLodingStatus,
  }
}
