import { Link } from 'react-router-dom'

import { registerUser } from '@/store/userSlice'
import { useAppDispatch } from '@/store'
import { ROUTES } from '@/constants/routes'
import { Form } from '@/components'

import s from './RegisterPage.module.css'

export const RegisterPage = () => {
  const dispatch = useAppDispatch()

  const handleClick = (userData: { email: string; password: string }) => {
    dispatch(registerUser(userData))
  }

  return (
    <div className={s.container}>
      <Form title="Регистрация" handleClick={handleClick}></Form>
      <p>
        Есть аккаунта? <Link to={ROUTES.LOGIN}>Войти</Link>
      </p>
    </div>
  )
}
