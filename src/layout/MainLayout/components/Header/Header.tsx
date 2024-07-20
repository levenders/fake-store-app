import { memo } from 'react'

import { Link } from 'react-router-dom'
import cn from 'classnames'

import { Button, Loader, Search } from '@/components'
import { useAppDispatch } from '@/store'
import { useCart } from '@/hooks/useCart'
import { useHistoryItems } from '@/hooks/useHistoryItems'
import { logoutUser } from '@/store/userSlice/actionCreators'
import { useTheme } from '@/context'
import { ROUTES } from '@/constants/routes'

import s from './Header.module.css'

export const Header = memo(function Header() {
  const { isTheme, toggleTheme } = useTheme()

  const dispatch = useAppDispatch()

  const { cartItemsCount, isCartLoading } = useCart()
  const { historyItems, isHistoryLoading } = useHistoryItems()

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
      <Search />
      <Link to={ROUTES.HISTORY} className={cn(s.link, s.button)}>
        <span className={cn(s.icon, s.historyIcon)} />
        <span className={s.counter}>
          <Loader when={isHistoryLoading} size="small">
            {historyItems}
          </Loader>
        </span>
      </Link>
      <Link to={ROUTES.CART} className={cn(s.link, s.button)}>
        <span className={cn(s.icon, s.cartIcon)} />
        <span className={s.counter}>
          <Loader when={isCartLoading} size="small">
            {cartItemsCount}
          </Loader>
        </span>
      </Link>
      <Button className={s.button} onClick={toggleTheme}>
        <span
          className={cn(s.icon, {
            [s.darkIcon]: isTheme === 'dark',
            [s.lightIcon]: isTheme === 'light',
          })}
        />
      </Button>
      <Button className={s.button} onClick={handleLogout}>
        Выйти
      </Button>
    </div>
  )
})
