import { memo } from 'react'

import { Link } from 'react-router-dom'

import { useAppDispatch } from '@/store'
import { logoutUser } from '@/store/userSlice/actionCreators'
import { ROUTES } from '@/constants/routes'
import { Button } from '@/components'

import s from './Header.module.css'

export const Header = memo(function Header() {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <>
      <div className={s.container}>
        <Link to={ROUTES.HOME}>
          <img alt="logo" src="/ui-images/logo.png" className={s.logo} />
        </Link>
        <Button className={s.button} onClick={handleLogout}>
          Выйти
        </Button>
      </div>
    </>
  )
})
