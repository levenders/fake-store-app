import type { FetchBaseQueryMeta } from '@reduxjs/toolkit/query'
import type { ProductItem, TransformProductItem } from '@/types'

export const parseLoadedSingleProduct = (
  response: ProductItem,
): TransformProductItem => {
  return {
    id: response.id,
    title: response.title,
    price: response.price,
    description: response.description,
    image: response.image,
  }
}

export const parseLoadedAllProducts = (
  response: ProductItem[],
): TransformProductItem[] => {
  return response.map(parseLoadedSingleProduct)
}

export const parseSearchProducts = (
  response: ProductItem[],
  _: FetchBaseQueryMeta | undefined,
  arg: string,
): TransformProductItem[] => {
  if (!arg) {
    return []
  }

  return response
    .map(parseLoadedSingleProduct)
    .filter(product => product.title.toLowerCase().includes(arg.toLowerCase()))
}
