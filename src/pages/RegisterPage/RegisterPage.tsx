import { useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { Form } from '@/components'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { registerUser } from '@/store'
import type { FormUserData } from '@/types/user'

import s from './RegisterPage.module.css'

export const RegisterPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useAppSelector(state => state.user)

  const handleClick = (userData: FormUserData) => {
    dispatch(registerUser(userData))
  }

  useEffect(() => {
    if (id) {
      navigate('/')
    }
  })

  return (
    <div className={s.container}>
      <Form title="Регистрация" handleClick={handleClick}></Form>
      <p>
        Есть аккаунта? <Link to="/login">Войти</Link>
      </p>
    </div>
  )
}
