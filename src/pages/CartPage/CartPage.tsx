import { lazy, Suspense, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import { Button, Headling, Loader } from '@/components'
import { useCartItems } from '@/hooks/useCartItems'
import { useAppDispatch } from '@/store'
import {
  cartLoadingStatusSelector,
  cartSelector,
  clearCart,
} from '@/store/cartSlice'
import type { CartItem } from '@/types/cart'

import s from './CartPage.module.css'

const LazyCartProduct = lazy(() =>
  import('@/components').then(module => ({ default: module.CartProduct })),
)

export const CartPage = () => {
  const [loadingOrder, setLoadingOrder] = useState(false)

  const cart = useSelector(cartSelector)
  const loadingStatus = useSelector(cartLoadingStatusSelector)
  const dispatch = useAppDispatch()

  const { cartItems } = useCartItems()

  const handleClick = () => {
    setLoadingOrder(true)
    dispatch(clearCart())
  }

  useEffect(() => {
    if (loadingStatus === 'idle') {
      setLoadingOrder(false)
    }
  }, [loadingStatus])

  if (!cartItems) {
    return (
      <div className={s.container}>
        <Headling> Корзина пока что пустая ...</Headling>
      </div>
    )
  }

  if (loadingStatus === 'loading' && loadingOrder) {
    return <Loader />
  }

  return (
    <div className={s.container}>
      <Headling>Корзина</Headling>
      <Button onClick={handleClick}>Оформить заказ</Button>
      <Suspense fallback={<Loader />}>
        <div>
          {cart.map((item: CartItem) => (
            <LazyCartProduct key={item.id} id={item.id} />
          ))}
        </div>
      </Suspense>
    </div>
  )
}
