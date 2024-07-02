import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

import cn from 'classnames'

import styles from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref,
) {
  return <input className={cn(className, styles.input)} ref={ref} {...props} />
})
