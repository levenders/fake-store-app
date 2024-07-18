import { useEffect, useState } from 'react'

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

  const [isHistoryLodingStatus, setIsHistoryLodingStatus] = useState(false)

  useEffect(() => {
    dispatch(getHistory())
  }, [dispatch])

  useEffect(() => {
    if (historyLoadingStatus === 'loading') {
      setIsHistoryLodingStatus(true)
    } else {
      setIsHistoryLodingStatus(false)
    }
  }, [historyLoadingStatus])

  return {
    historyItems: history.length,
    history,
    isHistoryLoading: isHistoryLodingStatus,
  }
}
