import { Link } from 'react-router-dom'

import { Button } from '@/components'
import { getPriceUsd } from '@/helpers'
import type { TransformProductItem } from '@/types'

import s from './Product.module.css'

interface ProductProps {
  product: TransformProductItem
}

export const Product = ({ product }: ProductProps) => {
  const { id, title, image, price } = product
  const fullPrice = getPriceUsd(price)

  return (
    <Link to={`/product/${id}`} className={s.container}>
      <div className={s.title}>{title}</div>
      <img alt={title} src={image} className={s.image} />
      <div className={s.price}>{fullPrice}</div>
      <Button className={s.button}>Купить</Button>
    </Link>
  )
}
