import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { Button, CounterButton } from '@/components'
import { useAppDispatch } from '@/store'
import { addToCart } from '@/store/cartSlice'
import { useCartItems } from '@/hooks/useCartItems'
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
  const dispach = useAppDispatch()
  const { countById } = useCartItems(id)

  const handleClick = () => {
    dispach(addToCart({ id, count: 1 }))
  }

  return (
    <div
      className={cn(s.container, {
        [s.dark]: isTheme === 'dark',
        [s.light]: isTheme === 'light',
      })}
    >
      <Link to={`/product/${id}`} className={s.link}>
        <div className={s.title}>{title}</div>
        <img alt={title} src={image} className={s.image} />
        <div className={s.price}>{fullPrice}</div>
      </Link>
      {countById > 0 ? (
        <CounterButton id={id} />
      ) : (
        <Button className={s.button} onClick={handleClick}>
          Купить
        </Button>
      )}
    </div>
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
