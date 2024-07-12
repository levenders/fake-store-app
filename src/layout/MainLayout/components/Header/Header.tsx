import { memo } from 'react'

import { Link } from 'react-router-dom'
import cn from 'classnames'

import { useAppDispatch } from '@/store'
import { logoutUser } from '@/store/userSlice/actionCreators'
import { useTheme } from '@/context'
import { ROUTES } from '@/constants/routes'
import { Button } from '@/components'

import s from './Header.module.css'

export const Header = memo(function Header() {
  const dispatch = useAppDispatch()
  const { isTheme, toggleTheme } = useTheme()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <>
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
        <Button className={s.button} onClick={handleLogout}>
          Выйти
        </Button>
      </div>
    </>
  )
})
