import { useNavigate, useParams } from 'react-router-dom'

import { Button, Headling } from '@/components'
import { getPriceUsd } from '@/helpers'
import { productApi } from '@/services'

import s from './ProductPage.module.css'

export const ProductPage = () => {
  const navigate = useNavigate()

  const { id } = useParams()
  const { data: p, isLoading, error } = productApi.useGetProductQuery(id)

  return (
    <>
      {isLoading && <h3 className={s.isLoading}>Идет загрузка товара...</h3>}
      {error && (
        <h3 className={s.error}>Произошла ошибка. Перезагрузите страницу</h3>
      )}
      {p && (
        <div className={s.container}>
          <div className={s.lside}>
            <Button className={s.button} onClick={() => navigate(-1)}>
              Назад
            </Button>
            <img alt={p.title} src={p.image} className={s.image} />
          </div>
          <div className={s.rside}>
            <Headling>{p.title}</Headling>
            <p>{p.description}</p>
            <div className={s.buyLine}>
              <p className={s.price}>{getPriceUsd(p.price)}</p>
              <Button>В Корзину</Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
