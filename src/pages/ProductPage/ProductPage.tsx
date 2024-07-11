import { useNavigate, useParams } from 'react-router-dom'
import cn from 'classnames'

import { Button, Headling, Loader } from '@/components'
import { getPriceUsd } from '@/helpers/getPrice'
import { productApi } from '@/services/productsService'
import { useTheme } from '@/context'

import s from './ProductPage.module.css'

export const ProductPage = () => {
  const navigate = useNavigate()
  const { isTheme } = useTheme()

  const { id } = useParams()
  const { data: product, isLoading, error } = productApi.useGetProductQuery(id)

  return (
    <>
      {isLoading && <Loader />}
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
              <Button>В Корзину</Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
