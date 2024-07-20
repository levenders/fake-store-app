import { forwardRef } from 'react'
import type { ComponentPropsWithRef } from 'react'

import cn from 'classnames'

import s from './Input.module.css'

interface InputProps extends ComponentPropsWithRef<'input'> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref,
) {
  return <input className={cn(className, s.input)} ref={ref} {...props} />
})
