import { useParams } from 'react-router-dom'

import { Headling, Loader, Product } from '@/components'

import { productApi } from '@/services/productsService'

import s from './SearchPage.module.css'

export const SearchPage = () => {
  const { query } = useParams()

  const skipQuery = query === '' || query === undefined

  const {
    data: products,
    isLoading,
    error,
  } = productApi.useSearchProductsQuery(query || '', { skip: skipQuery })

  if (products === null) {
    return (
      <div className={s.container}>
        <Headling>
          Поиск по запросу <p className={s.query}>{query}</p> не дал результатов
          ...
        </Headling>
      </div>
    )
  }

  return (
    <>
      {isLoading && <Loader />}
      {error && (
        <h3 className={s.error}>Произошла ошибка. Перезагрузите страницу</h3>
      )}
      {products && (
        <div className={s.container}>
          <Headling>
            Результат поиска по запросу: <p className={s.query}>{query}</p>
          </Headling>
          <div className={s.list}>
            {products.map(p => (
              <Product key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
