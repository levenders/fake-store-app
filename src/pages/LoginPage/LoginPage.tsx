import { useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { Form } from '@/components'
import { useAppDispatch } from '@/hooks'
import { loginUser } from '@/store'
import type { FormUserData } from '@/types/user'

import s from './LoginPage.module.css'
import { useAuth } from '@/hooks'

export const LoginPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isAuth } = useAuth()

  const handleClick = (userData: FormUserData) => {
    dispatch(loginUser(userData))
  }

  useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth, navigate])

  return (
    <div className={s.container}>
      <Form title="Вход" handleClick={handleClick}></Form>
      <p>
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </p>
    </div>
  )
}
