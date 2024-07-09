import { lazy, Suspense } from 'react'

import { Loader } from '@/components'

const ProductsList = lazy(() =>
  import('@/components').then(module => ({ default: module.ProductsList })),
)

export const HomePage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ProductsList />
    </Suspense>
  )
}
