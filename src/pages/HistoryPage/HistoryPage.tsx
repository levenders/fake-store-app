import { lazy, Suspense } from 'react'

import { Button, Headling, Loader } from '@/components'
import { useHistoryItems } from '@/hooks/useHistoryItems'
import { useAppDispatch } from '@/store'
import { clearHistory } from '@/store/historySlice'

import s from './HistoryPage.module.css'

const LazyHistoryItem = lazy(() =>
  import('@/components').then(module => ({ default: module.HistoryItem })),
)

export const HistoryPage = () => {
  const { history, historyItems } = useHistoryItems()
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(clearHistory())
  }

  if (!historyItems) {
    return (
      <div className={s.container}>
        <Headling> История пока что пустая ...</Headling>
      </div>
    )
  }

  return (
    <div className={s.container}>
      <Headling>История поисков</Headling>

      <Suspense fallback={<Loader />}>
        {historyItems && (
          <>
            <Button onClick={handleClick}>Очистить историю</Button>
            {history.map((h, i) => (
              <LazyHistoryItem key={i} query={h}></LazyHistoryItem>
            ))}
          </>
        )}
      </Suspense>
    </div>
  )
}
