import cn from 'classnames'

import { CounterButton, Loader } from '@/components'
import { useGetProductQuery } from '@/services/productsService'
import { getPriceUsd } from '@/helpers/getPrice'
import { useTheme } from '@/context'

import s from './CartProduct.module.css'
import { Link } from 'react-router-dom'

interface CartItemProps {
  id: number
}
export const CartProduct = ({ id }: CartItemProps) => {
  const { data: product, error, isLoading } = useGetProductQuery(String(id))
  const { isTheme } = useTheme()

  return (
    <>
      {isLoading && <Loader />}
      {error && <h3>Произошла ошибка. Перезагрузите страницу</h3>}
      {product && (
        <>
          <div
            key={product.id}
            className={cn(s.container, {
              [s.dark]: isTheme === 'dark',
              [s.light]: isTheme === 'light',
            })}
          >
            <div className={s.leftSide}>
              <Link to={`/product/${id}`}>
                <img
                  alt={product.title}
                  src={product.image}
                  className={s.image}
                />
              </Link>
            </div>
            <div className={s.center}>
              <div className={s.title}>{product.title}</div>
              <div className={s.price}>{getPriceUsd(product.price)}</div>
            </div>
            <CounterButton id={id} />
          </div>
        </>
      )}
    </>
  )
}
