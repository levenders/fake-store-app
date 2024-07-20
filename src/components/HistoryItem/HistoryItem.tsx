import { Link } from 'react-router-dom'
import cn from 'classnames'

import { Button } from '@/components'
import { useTheme } from '@/context'
import { useAppDispatch } from '@/store'
import { removeHistoryItem } from '@/store/historySlice'

import s from './HistoryItem.module.css'

interface HistoryItemProps {
  query: string
}

export const HistoryItem = ({ query }: HistoryItemProps) => {
  const dispatch = useAppDispatch()

  const { isTheme } = useTheme()

  const handleClick = () => {
    dispatch(removeHistoryItem(query))
  }

  return (
    <div
      className={cn(s.container, {
        [s.dark]: isTheme === 'dark',
        [s.light]: isTheme === 'light',
      })}
    >
      <Link to={`/search/${query}`} className={s.query}>
        {query}
      </Link>
      <Button className={s.button} onClick={handleClick}>
        ×
      </Button>
    </div>
  )
}
