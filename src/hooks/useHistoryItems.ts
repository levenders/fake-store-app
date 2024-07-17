import { useEffect } from 'react'

import { useSelector } from 'react-redux'

import { useAppDispatch } from '@/store'
import { getHistory, historySelector } from '@/store/historySlice'

export const useHistoryItems = () => {
  const dispatch = useAppDispatch()
  const history = useSelector(historySelector)

  useEffect(() => {
    dispatch(getHistory())
  }, [dispatch])

  return {
    historyItems: history.length,
    history,
  }
}
