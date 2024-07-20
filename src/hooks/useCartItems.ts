import { useSelector } from 'react-redux'

import { cartItemLoadingSelector, cartSelector } from '@/store/cartSlice'

export const useCartItems = (id: number) => {
  const cart = useSelector(cartSelector)
  const isCartItemLoading = useSelector(cartItemLoadingSelector(id))

  const getItemCountById = (id: number | undefined): number => {
    if (id === undefined) {
      return 0
    }
    const item = cart.find(i => i.id === id)
    return item ? item.count : 0
  }

  return {
    countById: getItemCountById(id),
    isCartLoadingById: isCartItemLoading,
  }
}
