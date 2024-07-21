import { useEffect } from 'react'

import { useSelector } from 'react-redux'

import { useAppDispatch } from '@/store'
import {
  getHistory,
  historyLoadingStatusSelector,
  historySelector,
} from '@/store/historySlice'

export const useHistoryItems = () => {
  const dispatch = useAppDispatch()
  const history = useSelector(historySelector)
  const historyLoadingStatus = useSelector(historyLoadingStatusSelector)

  useEffect(() => {
    dispatch(getHistory())
  }, [dispatch])

  const isHistoryLoading = historyLoadingStatus === 'loading'

  return {
    historyItems: history.length,
    history,
    isHistoryLoading,
  }
}
