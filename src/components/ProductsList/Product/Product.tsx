import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { Button, CounterButton, Loader } from '@/components'
import { useAppDispatch } from '@/store'
import { addToCart } from '@/store/cartSlice'
import { useCartItems } from '@/hooks/useCartItems'
import { useTheme } from '@/context'
import { getPriceUsd } from '@/helpers/getPrice'
import type { TransformProductItem } from '@/types'

import s from './Product.module.css'
import { useSelector } from 'react-redux'
import { userSelector } from '@/store/userSlice'
import { ROUTES } from '@/constants/routes'

interface ProductProps {
  product: TransformProductItem
}

export const Product = ({ product }: ProductProps) => {
  const { id, title, image, price } = product

  const user = useSelector(userSelector)

  const navigate = useNavigate()

  const { isTheme } = useTheme()

  const dispatch = useAppDispatch()

  const { countById, isCartLoadingById } = useCartItems(id)

  const fullPrice = getPriceUsd(price)

  const handleClick = () => {
    if (user) {
      dispatch(addToCart({ id, count: 1, isLoading: isCartLoadingById }))
    } else {
      navigate(ROUTES.LOGIN)
    }
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
      <Loader size="small" when={isCartLoadingById}>
        {countById > 0 ? (
          <CounterButton id={id} />
        ) : (
          <Button className={s.button} onClick={handleClick}>
            Купить
          </Button>
        )}
      </Loader>
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
