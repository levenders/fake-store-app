import type { ButtonHTMLAttributes, ReactNode } from 'react'

import cn from 'classnames'

import s from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button className={cn(className, s.button)} {...props}>
      {children}
    </button>
  )
}
