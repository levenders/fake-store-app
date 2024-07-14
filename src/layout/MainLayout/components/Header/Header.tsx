import { memo } from 'react'

import { Link } from 'react-router-dom'
import cn from 'classnames'

import { useAppDispatch } from '@/store'
import { useCartItems } from '@/hooks/useCartItems'
import { logoutUser } from '@/store/userSlice/actionCreators'
import { useTheme } from '@/context'
import { ROUTES } from '@/constants/routes'
import { Button } from '@/components'

import s from './Header.module.css'

export const Header = memo(function Header() {
  const dispatch = useAppDispatch()
  const { isTheme, toggleTheme } = useTheme()
  const { cartItems } = useCartItems()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <div
      className={cn(s.container, {
        [s.dark]: isTheme === 'dark',
        [s.light]: isTheme === 'light',
      })}
    >
      <Link to={ROUTES.HOME}>
        <img alt="logo" src="/ui-images/logo.png" className={s.logo} />
      </Link>
      <Button className={s.button} onClick={toggleTheme}>
        <span
          className={cn(s.icon, {
            [s.darkIcon]: isTheme === 'dark',
            [s.lightIcon]: isTheme === 'light',
          })}
        />
      </Button>
      <Link to={ROUTES.CART} className={cn(s.cartLink, s.button)}>
        <span className={s.cartIcon} />
        <span className={s.cartCounter}>{cartItems}</span>
      </Link>
      <Button className={s.button} onClick={handleLogout}>
        Выйти
      </Button>
    </div>
  )
})
