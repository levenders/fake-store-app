import { Link } from 'react-router-dom'

import { loginUser } from '@/store/userSlice'
import { useAppDispatch } from '@/store'
import { ROUTES } from '@/constants/routes'
import { Form } from '@/components'

import s from './LoginPage.module.css'

export const LoginPage = () => {
  const dispatch = useAppDispatch()

  const handleClick = (userData: { email: string; password: string }) => {
    dispatch(loginUser(userData))
  }

  return (
    <div className={s.container}>
      <Form title="Вход" handleClick={handleClick}></Form>
      <p>
        Нет аккаунта? <Link to={ROUTES.REGISTER}>Войти</Link>
      </p>
    </div>
  )
}
