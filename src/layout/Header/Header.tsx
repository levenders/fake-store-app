import { memo } from 'react'

import { Link, Outlet } from 'react-router-dom'

import s from './Header.module.css'

export const Header = memo(function Header() {
  return (
    <>
      <div className={s.container}>
        <Link to="/">
          <img alt="logo" src="logo.png" className={s.logo} />
        </Link>
      </div>
      <Outlet />
    </>
  )
})
