import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import cn from 'classnames'

import s from './Button.module.css'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode
}

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button className={cn(className, s.button)} {...props}>
      {children}
    </button>
  )
}
