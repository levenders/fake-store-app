import { memo } from 'react'

import cn from 'classnames'

import s from './Loader.module.css'

interface LoaderProps {
  size?: 'large' | 'small'
}

export const Loader = memo(function Loader({ size = 'large' }: LoaderProps) {
  return (
    <span
      className={cn(s.loader, {
        [s.large]: size === 'large',
        [s.small]: size === 'small',
      })}
    />
  )
})
