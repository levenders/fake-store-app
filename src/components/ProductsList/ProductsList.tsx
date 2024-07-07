import { useEffect, useState } from 'react'

import { Button, Product } from '@/components'

import { productApi } from '@/services'

import s from './ProductsList.module.css'

export const ProductsList = () => {
  const [limit, setLimit] = useState<number>(5)
  const [visibilityButton, setvisibilityButton] = useState<boolean>(true)

  const {
    data: products,
    isLoading,
    error,
  } = productApi.useGetAllProductsQuery(limit)

  const handlerClick = () => {
    setLimit(prevLimit => prevLimit + 5)
  }

  useEffect(() => {
    if (limit === 20) {
      setvisibilityButton(false)
    }
    //у API нет специального эндпоинта для получения только количества элементов, поэтому тут вручную прописал 20
  }, [limit])

  return (
    <>
      {isLoading && <h3 className={s.isLoading}>Идет загрузка продуктов...</h3>}
      {error && (
        <h3 className={s.error}>Произошла ошибка. Перезагрузите страницу</h3>
      )}
      {products && (
        <div className={s.container}>
          <div className={s.list}>
            {products.map(p => (
              <Product key={p.id} product={p} />
            ))}
          </div>
          {visibilityButton && (
            <Button className={s.button} onClick={handlerClick}>
              Еще?
            </Button>
          )}
        </div>
      )}
    </>
  )
}
