import { useNavigate, useParams } from 'react-router-dom'
import cn from 'classnames'

import { Button, CounterButton, Headling, Loader } from '@/components'
import { useCartItems } from '@/hooks/useCartItems'
import { useAppDispatch } from '@/store'
import { addToCart } from '@/store/cartSlice'
import { getPriceUsd } from '@/helpers/getPrice'
import { productApi } from '@/services/productsService'
import { useTheme } from '@/context'

import s from './ProductPage.module.css'

export const ProductPage = () => {
  const navigate = useNavigate()
  const { isTheme } = useTheme()
  const { id } = useParams()
  const { data: product, isLoading, error } = productApi.useGetProductQuery(id)

  const idAsNumber = Number(id) // необходимый фикс из-за возвращаемого типа от useParams
  const { countById, isCartItemLoading } = useCartItems(idAsNumber)
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(
      addToCart({ id: idAsNumber, count: 1, isLoading: isCartItemLoading }),
    )
  }

  return (
    <Loader when={isLoading}>
      {error && (
        <h3 className={s.error}>Произошла ошибка. Перезагрузите страницу</h3>
      )}
      {product && (
        <div
          className={cn(s.container, {
            [s.dark]: isTheme === 'dark',
            [s.light]: isTheme === 'light',
          })}
        >
          <div className={s.lside}>
            <Button className={s.button} onClick={() => navigate(-1)}>
              Назад
            </Button>
            <img alt={product.title} src={product.image} className={s.image} />
          </div>
          <div className={s.rside}>
            <Headling>{product.title}</Headling>
            <p>{product.description}</p>
            <div className={s.buyLine}>
              <p className={s.price}>{getPriceUsd(product.price)}</p>
              <Loader when={isCartItemLoading} size="small">
                {countById > 0 ? (
                  <CounterButton id={idAsNumber} />
                ) : (
                  <Button className={s.button} onClick={handleClick}>
                    Купить
                  </Button>
                )}
              </Loader>
            </div>
          </div>
        </div>
      )}
    </Loader>
  )
}
