export interface ProductItem {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: ProductItemRating
}

export interface ProductItemRating {
  rate: number
  count: number
}

export interface TransformProductItem {
  id: number
  title: string
  price: number
  description: string
  image: string
}
