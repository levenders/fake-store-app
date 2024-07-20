import { lazy, Suspense } from 'react'

import { useSelector } from 'react-redux'

import { Button, Headling, Loader } from '@/components'
import { useCart } from '@/hooks/useCart'
import { useAppDispatch } from '@/store'
import { cartSelector, clearCart } from '@/store/cartSlice'
import type { CartItem } from '@/types/cart'

import s from './CartPage.module.css'

const LazyCartProduct = lazy(() =>
  import('@/components').then(module => ({ default: module.CartProduct })),
)

export const CartPage = () => {
  const cart = useSelector(cartSelector)

  const dispatch = useAppDispatch()

  const { cartItemsCount } = useCart()

  const handleClick = () => {
    dispatch(clearCart())
  }

  if (!cartItemsCount) {
    return (
      <div className={s.container}>
        <Headling> Корзина пока что пустая ...</Headling>
      </div>
    )
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
