import { Button, Loader } from '@/components'
import { addToCart, decrementCartItem, removeCartItem } from '@/store/cartSlice'
import { useCartItems } from '@/hooks/useCartItems'
import { useAppDispatch } from '@/store'

import s from './CounterButton.module.css'

interface CounterButtonProps {
  id: number
}

export const CounterButton = ({ id }: CounterButtonProps) => {
  const { countById } = useCartItems(id)
  const { isCartLoadingById } = useCartItems(id)

  const dispatch = useAppDispatch()

  const handleDecrementClick = () => {
    dispatch(decrementCartItem(id))
  }

  const handleIncrementClick = () => {
    dispatch(addToCart({ id: id, count: 1 }))
  }

  const handleRemoveClick = () => {
    dispatch(removeCartItem(id))
  }

  return (
    <Loader when={isCartLoadingById}>
      <div className={s.container}>
        <Button onClick={handleDecrementClick}>-</Button>
        <p className={s.counter}>{countById}</p>
        <Button onClick={handleIncrementClick}>+</Button>
        <Button onClick={handleRemoveClick}>×</Button>
      </div>
    </Loader>
  )
}
