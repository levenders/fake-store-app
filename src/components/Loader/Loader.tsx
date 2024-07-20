import { memo, type ReactNode } from 'react'

import cn from 'classnames'

import s from './Loader.module.css'

interface LoaderProps {
  when?: boolean
  size?: 'large' | 'small'
  children?: ReactNode
}

export const Loader = memo(function Loader({
  when = true,
  size = 'large',
  children,
}: LoaderProps) {
  return when ? (
    <span
      className={cn(s.loader, {
        [s.large]: size === 'large',
        [s.small]: size === 'small',
      })}
    />
  ) : (
    <>{children}</>
  )
})
