import { useState } from 'react'
import type {
  ChangeEvent,
  ComponentPropsWithoutRef,
  Dispatch,
  FormEvent,
  SetStateAction,
} from 'react'

import { Button, Headling, Input } from '@/components'

import s from './Form.module.css'

interface FormProps extends ComponentPropsWithoutRef<'form'> {
  title: string
  handleClick: (email: string, password: string) => void
}

export const Form = ({ title, handleClick }: FormProps) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleClick(email, password)
  }

  const handleChange =
    (setter: Dispatch<SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value)

  return (
    <div className={s.container}>
      <Headling>{title}</Headling>
      <form className={s.form} onSubmit={handleSubmit}>
        <Input
          type="email"
          value={email}
          placeholder="email"
          onChange={handleChange(setEmail)}
        />
        <Input
          type="password"
          value={password}
          placeholder="password"
          onChange={handleChange(setPassword)}
        />
        <Button>{title}</Button>
      </form>
    </div>
  )
}
