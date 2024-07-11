import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { Button } from '@/components'
import { useTheme } from '@/context'
import { getPriceUsd } from '@/helpers/getPrice'
import type { TransformProductItem } from '@/types'

import s from './Product.module.css'

interface ProductProps {
  product: TransformProductItem
}

export const Product = ({ product }: ProductProps) => {
  const { id, title, image, price } = product
  const { isTheme } = useTheme()
  const fullPrice = getPriceUsd(price)

  return (
    <Link
      to={`/product/${id}`}
      className={cn(s.container, {
        [s.dark]: isTheme === 'dark',
        [s.light]: isTheme === 'light',
      })}
    >
      <div className={s.title}>{title}</div>
      <img alt={title} src={image} className={s.image} />
      <div className={s.price}>{fullPrice}</div>
      <Button className={s.button}>Купить</Button>
    </Link>
  )
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
}
