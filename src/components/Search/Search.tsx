import { useEffect, useRef, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import cn from 'classnames'

import { Button, Input } from '@/components'
import { useDebounce } from '@/hooks/useDebounce'
import { productApi } from '@/services/productsService'
import { useAppDispatch } from '@/store'
import { addToHistory } from '@/store/historySlice'

import s from './Search.module.css'

export const Search = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const ref = useRef<HTMLDivElement | null>(null)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const debounceValue = useDebounce(inputValue)

  const { data: products } = productApi.useSearchProductsQuery(debounceValue)

  const resetInput = () => {
    setInputValue('')
    setIsOpen(false)
  }

  const handleSearchButtonClick = () => {
    const query = inputValue.trim()
    if (query) {
      dispatch(addToHistory(query))
      resetInput()
      navigate(`/search/${query}`, { replace: true })
    }
  }

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchButtonClick()
    }
  }

  const handleInputFocus = () => {
    if (debounceValue) {
      setIsOpen(true)
    }
  }

  useEffect(() => {
    if (debounceValue) {
      setIsOpen(true)
    }
  }, [debounceValue])

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target
      if (
        ref.current &&
        target instanceof Node &&
        !ref.current.contains(target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleDocumentClick)

    return () => document.removeEventListener('click', handleDocumentClick)
  }, [])

  return (
    <div className={s.container} ref={ref}>
      <Input
        className={s.input}
        value={inputValue}
        onFocus={handleInputFocus}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleEnterPress}
      />
      {isOpen && (
        <div className={s.suggestions}>
          {products &&
            products.map(p => (
              <Link
                to={`/product/${p.id}`}
                replace
                key={p.id}
                className={cn(s.suggestItem, s.active)}
                onClick={resetInput}
              >
                {p.title}
              </Link>
            ))}
        </div>
      )}
      {isOpen && products === null && (
        <div className={s.suggestions}>
          <p className={s.suggestItem}>Запрос не дал результатов...</p>
        </div>
      )}
      <Button className={s.button} onClick={handleSearchButtonClick}>
        <span className={s.icon} />
      </Button>
    </div>
  )
}
