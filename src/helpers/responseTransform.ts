import type { ProductItem, TransformProductItem } from '@/types'

export const parseLoadedProducts = (
  response: ProductItem | ProductItem[],
): TransformProductItem | TransformProductItem[] => {
  if (Array.isArray(response)) {
    return response.map(item => ({
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      image: item.image,
    }))
  } else {
    return {
      id: response.id,
      title: response.title,
      price: response.price,
      description: response.description,
      image: response.image,
    }
  }
}
