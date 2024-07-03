import type { ReactNode } from 'react'

import s from './Headling.module.css'

interface HeadlingProps {
  children: ReactNode
}

export const Headling = ({ children, ...props }: HeadlingProps) => {
  return (
    <h1 className={s.headling} {...props}>
      {children}
    </h1>
  )
}
